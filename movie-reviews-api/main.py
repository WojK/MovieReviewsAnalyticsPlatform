import io
import os
import pandas as pd
from fastapi import FastAPI, UploadFile, Form
from features.keywordsExtraction.keywords_yake import get_keywords_yake
from features.keywordsExtraction.keywords_rake import get_keywords_rake
from features.keywordsExtraction.keywords_keybert import get_keywords_keyBert
from features.summarization.summarizer_textrank import summarize_textrank
from features.summarization.summarizer_luhn import summarize_luhn
from features.summarization.summarizer_bert import summarize_bert
from features.summarization.summarizer_gpt2 import summarize_gpt2
from features.sentimentAnalysis.sentiment_logisticRegression import count_proba_logisticRegression_cv_text, \
    count_proba_logisticRegression_tfidf_text
from features.sentimentAnalysis.sentiment_naiveBayes import count_proba_naiveBayes_cv_text, \
    count_proba_naiveBayes_tfidf_text
from features.sentimentAnalysis.sentiment_BERT import count_proba_BERT_text
from features.sentimentAnalysis.sentiment_LSTM import count_proba_LSTM_text
from features.wordsAvg.words_avg import count_words_avg
from features.wordCloud.word_cloud import generate_word_cloud
from features.analyzeFileUtils.fileUtils import analyze_sentiment_file, summarize_texts_file, extract_keywords_file, \
    count_reviews_positive_and_negative, get_all_keywords
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware


class KeywordsExtractionBody(BaseModel):
    text: str
    n_words: int


class SummarizationBody(BaseModel):
    text: str
    ratio: int


class SentimentBody(BaseModel):
    text: str


class WordsAvgBody(BaseModel):
    texts: list


class CsvBody(BaseModel):
    file: UploadFile
    summarizationMethod: str
    summarizationRatio: int
    keywordsExtractionMethod: str
    n_keywords: int
    sentimentAnalysisMethod: str


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/keywords-yake")
def keywords_yake(body: KeywordsExtractionBody):
    kw = get_keywords_yake(body.text, body.n_words)
    return {"keywords": kw}


@app.post("/keywords-rake")
def keywords_rake(body: KeywordsExtractionBody):
    kw = get_keywords_rake(body.text, body.n_words)
    return {"keywords": kw}


@app.post("/keywords-keybert")
def keywords_keybert(body: KeywordsExtractionBody):
    kw = get_keywords_keyBert(body.text, body.n_words)
    return {"keywords": kw}


@app.post("/summarization-textrank")
def summarization_textrank(body: SummarizationBody):
    summarization = summarize_textrank(body.text, body.ratio)
    return {"summarization": summarization}


@app.post("/summarization-luhn")
def summarization_luhn(body: SummarizationBody):
    summarization = summarize_luhn(body.text, body.ratio)
    return {"summarization": summarization}


@app.post("/summarization-bert")
def summarization_bert(body: SummarizationBody):
    summarization = summarize_bert(body.text, body.ratio)
    return {"summarization": summarization}


@app.post("/summarization-gpt2")
def summarization_GPT2(body: SummarizationBody):
    summarization = summarize_gpt2(body.text, body.ratio)
    return {"summarization": summarization}


@app.post("/sentiment-logistic-regression-cv")
def sentiment_logistic_regression_cv(body: SentimentBody):
    probs = count_proba_logisticRegression_cv_text(body.text)
    return probs


@app.post("/sentiment-logistic-regression-tfidf")
def sentiment_logistic_regression_tfidf(body: SentimentBody):
    probs = count_proba_logisticRegression_tfidf_text(body.text)
    return probs


@app.post("/sentiment-naive-bayes-cv")
def sentiment_naive_bayes_cv(body: SentimentBody):
    probs = count_proba_naiveBayes_cv_text(body.text)
    return probs


@app.post("/sentiment-naive-bayes-tfidf")
def sentiment_naive_bayes_tfidf(body: SentimentBody):
    probs = count_proba_naiveBayes_tfidf_text(body.text)
    return probs


@app.post("/sentiment-bert")
def sentiment_bert(body: SentimentBody):
    probs = count_proba_BERT_text(body.text)
    return probs


@app.post("/sentiment-lstm")
def sentiment_lstm(body: SentimentBody):
    probs = count_proba_LSTM_text(body.text)
    return probs


@app.post("/avg-words")
def get_avg_words(body: WordsAvgBody):
    result = count_words_avg(body.texts)
    return {"words_avg": result}


@app.post("/word-cloud-file")
def file_get_word_cloud(file: Annotated[UploadFile, Form()]):
    f = file.file.read()
    xlsx = io.BytesIO(f)
    df = pd.read_excel(xlsx)
    df_reviews = df['review']
    img_output = os.path.expanduser('~\\WordCloud\\wordCloud.png')

    generate_word_cloud(df_reviews, img_output)
    return FileResponse(img_output)


@app.post("/analyze-file")
def file_analyze(file: Annotated[UploadFile, Form()],
                 summarization_method: Annotated[str, Form()],
                 summarization_ratio: Annotated[int, Form()],
                 keywords_extraction_method: Annotated[str, Form()],
                 n_keywords: Annotated[int, Form()],
                 sentiment_analysis_method: Annotated[str, Form()]):
    f = file.file.read()
    xlsx = io.BytesIO(f)
    df = pd.read_excel(xlsx)
    df_reviews = df['review']
    titles = [title for title in df['title']]
    reviews = [review for review in df_reviews]
    words_avg = count_words_avg(df_reviews)
    summarizations = summarize_texts_file(reviews, summarization_method, summarization_ratio)
    sentiments = analyze_sentiment_file(df_reviews, sentiment_analysis_method)
    pos, neg = count_reviews_positive_and_negative(sentiments)
    keywords = extract_keywords_file(df_reviews, keywords_extraction_method, n_keywords)
    all_keywords = get_all_keywords(keywords)
    return {"movieTitles": titles, "wordsAvg": words_avg, "summarizations": summarizations, "sentiments": sentiments,
            "keywords": keywords, "allKeywords": all_keywords, "reviewsPos": pos, "reviewsNeg": neg, "reviews": reviews}
