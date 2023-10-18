# Movie Reviews Analytics Platform

Aplikacja webowa do analizy recencji filmów wykorzystująca przetwarzanie języka naturalnego.

Aplikacja podejmuje problemy przetwarzania języka naturalnego takie jak określanie sentymentów recenzji, to znaczy ocena wydźwięku tekstu z danym prawdopodobieństwem klasyfikacji jako pozytywnej, wyszukiwanie słów kluczowych w recenzjach oraz wytwarzanie podsumowań tekstów poprzez wyodrębnienie zdań, które model uzna za najbardziej istotne. 

## Wykorzystywane narzędzia i technologie

Do analizy sentymetów zostały wykorzystane modele uczenia maszynowego takie jak:
- regresja logistyczna
- naiwny klasyfikator Bayesa
- rekurencyjna sieć neuronowa LSTM
- pretrenowany transformer BERT

Wyszukiwanie słów kluczowych:
- Rake
- Yake
- KeyBERT

Tworznie podsumowań tekstów:
- Luhn
- TextRank
- Bert Extractive Summarizer

Warstwa Frontend:
- TypeScript
- Next.js
- Tailwind
- AntDesign
- Clerk

Warstwa Backend:
- Python
- FastApi
- PostgreSQL
- Prisma

## Model bazy danych

![dbModel](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/315e5345-8f56-44bf-919e-e727a5a80ac8)

## Projekt graficzny
Odnośnik do projektu w Figmie:

https://www.figma.com/file/Su5ss1KjVuCVFDjBKwAw9a/MovieReviewsAnalyzer?type=design&node-id=0-1&mode=design&t=npnwUIPBOAwjo0UC-0


### Wymagania funkcjonalne
Aplikacja realizuje takie wymagania funkcjonalne jak:
- Wczytywanie recenzji z dostarczonego arkusza excel
- Określanie sentymentów dla zadanych recenzji
- Określanie słów kluczowych dla recenzji
- Filtrownie po słowach kluczowych
- Tworzenie podsumowań recenzji
- Przechowywanie historii analiz
- Tworzenie rankingu filmów na podstawie analiz

## Widoki z aplikacji
### Strona główna:
![2023-10-18 17_04_44-Movie reviews analyzer](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/32690150-8715-4bcc-8fac-11e283e75d30)


### Opis modeli:
![2023-10-18 17_05_35-Movie reviews analyzer](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/d89702e8-24e6-4e99-b88f-fe7014573922)


### Tworzenie nowej analizy:
![2023-10-18 17_06_21-Movie reviews analyzer](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/80f2824f-ad42-4830-8018-7359257d8204)


### Wyniki analizy:
![2023-10-18 17_07_19-Movie reviews analyzer](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/82a75b57-40a1-42cc-a5ee-e390b0f0d800)


### Szczegóły analizy: 
![results](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/5fb0165b-eaaa-41e0-a70e-890224454cd2)


### Wyświetlenie podsumowania:
![summarization](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/231ecf66-5e9c-45e1-b502-345f55030193)


### Historia analiz:
![history](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/10b30159-3a2e-4ef4-a3f9-6cbde476837e)


### Ranking filmów na podstawie dostarczonych recenzji:
![ranking](https://github.com/WojK/MovieReviewsAnalyticsPlatform/assets/106305960/95db6b27-d463-45e7-befc-51b75bceb57b)

