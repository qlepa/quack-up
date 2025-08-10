import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getPersonaById } from '../../../lib/personas';
import { getWorkModeById } from '../../../lib/functions';
import { ApiRequest, ApiResponse, ChatHistory } from '../../../lib/types';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body: ApiRequest = await request.json();
    const { persona, func, message, history } = body;

    if (!persona || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: persona and message' } as ApiResponse,
        { status: 400 }
      );
    }

    const selectedPersona = getPersonaById(persona);
    const selectedWorkMode = func === "none" ? null : getWorkModeById(func);
    
    if (!selectedPersona) {
      return NextResponse.json(
        { error: 'Invalid persona' } as ApiResponse,
        { status: 400 }
      );
    }

    const systemPrompt = selectedPersona.systemPrompt;
    
    // Debug: sprawdź, co jest przekazywane
    console.log('=== DEBUG INFO ===');
    console.log('Persona ID:', persona);
    console.log('Persona Name:', selectedPersona.name);
    console.log('Persona Description:', selectedPersona.description);
    console.log('System Prompt Length:', systemPrompt.length);
    console.log('System Prompt Preview:', systemPrompt.substring(0, 200) + '...');
    console.log('User Message:', message);
    console.log('History Length:', history.length);
    console.log('Work Mode:', selectedWorkMode?.name || 'Standard (none)');
    
    const messages: ChatHistory[] = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const payload = {
      model: "gpt-4o-mini" as const,
      temperature: selectedWorkMode?.temperature || 0.7,
      max_tokens: selectedWorkMode?.maxTokens || 1500,
      messages
    };

    console.log('OpenAI Payload:');
    console.log('- Model:', payload.model);
    console.log('- Temperature:', payload.temperature);
    console.log('- Max Tokens:', payload.max_tokens);
    console.log('- Messages Count:', payload.messages.length);
    console.log('- First Message (System):', payload.messages[0].role, payload.messages[0].content.substring(0, 100) + '...');

    const completion = await client.chat.completions.create(payload);

    console.log('OpenAI Response:', completion.choices[0].message?.content?.substring(0, 100) + '...');

    return NextResponse.json({ message: completion.choices[0].message?.content } as ApiResponse);
  } catch (error) {
    console.error('Error in think API:', error);
    return NextResponse.json(
      { error: 'Internal server error' } as ApiResponse,
      { status: 500 }
    );
  }
}
