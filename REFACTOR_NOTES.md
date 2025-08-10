# Refaktoryzacja projektu Quack Up

## Wprowadzone zmiany

### 1. Usunięcie zbędnych komentarzy
- Usunięto komentarze HTML z komponentów
- Usunięto console.logi z API route
- Uproszczono kod, zachowując czytelność

### 2. Poprawa server vs client boundaries
- Rozdzielono logikę biznesową do custom hooków
- API route używa tylko typów serwerowych
- Komponenty klienckie używają hooków dla logiki

### 3. Skalowalność aplikacji
- Utworzono centralny plik typów (`src/lib/types.ts`)
- Dodano plik konfiguracyjny (`src/config/constants.ts`)
- Utworzono narzędzia pomocnicze (`src/lib/utils.ts`)
- Dodano custom hook (`src/lib/hooks/useChat.ts`)

### 4. Struktura plików
```
src/
├── app/           # Next.js App Router
├── components/    # Komponenty React
├── config/        # Konfiguracja aplikacji
├── lib/          # Logika biznesowa i narzędzia
│   ├── hooks/    # Custom hooki
│   ├── types.ts  # Centralne typy
│   └── utils.ts  # Narzędzia pomocnicze
```

### 5. Usunięte elementy
- Usunięto nieużywany komponent `Selector.tsx`
- Usunięto zbędne funkcje z `personas.ts` i `functions.ts`
- Uproszczono interfejsy i typy

### 6. Korzyści refaktoryzacji
- Lepsze rozdzielenie odpowiedzialności
- Łatwiejsze testowanie i utrzymanie
- Centralne zarządzanie typami
- Reużywalne hooki i narzędzia
- Czytelniejszy i bardziej zorganizowany kod

## Uruchomienie projektu

```bash
npm install
npm run dev
```

## Struktura API

- **POST** `/api/think` - Główny endpoint do komunikacji z AI
- Parametry: `persona`, `func`, `message`, `history`
- Zwraca: `{ message: string }` lub `{ error: string }`
