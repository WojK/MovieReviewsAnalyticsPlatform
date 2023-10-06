from features.sentimentAnalysis.sentiment_logisticRegression import count_proba_logisticRegression_cv_many_texts, \
    count_proba_logisticRegression_tfidf_many_texts
from features.sentimentAnalysis.sentiment_naiveBayes import count_proba_naiveBayes_cv_many_texts, \
    count_proba_naiveBayes_tfidf_many_texts
from features.sentimentAnalysis.sentiment_LSTM import count_proba_LSTM_many_texts
from features.keywordsExtraction.keywords_keybert import get_keywords_many_texts_keyBert
from features.keywordsExtraction.keywords_rake import get_keywords_many_texts_rake
from features.keywordsExtraction.keywords_yake import get_keywords_many_texts_yake
from features.summarization.summarizer_gpt2 import summarize_many_gpt2
from features.summarization.summarizer_luhn import summarize_many_luhn
from features.summarization.summarizer_textrank import summarize_many_textrank
from features.summarization.summarizer_bert import summarize_many_bert
from features.sentimentAnalysis.sentiment_BERT import count_proba_BERT_many_texts


def analyze_sentiment_csv(df_reviews, method):
    if method == 'logisticRegressionCV':
        return count_proba_logisticRegression_cv_many_texts(df_reviews)
    elif method == 'logisticRegressionTFIDF':
        return count_proba_logisticRegression_tfidf_many_texts(df_reviews)
    elif method == 'naiveBayesCV':
        return count_proba_naiveBayes_cv_many_texts(df_reviews)
    elif method == 'naiveBayesTFIDF':
        return count_proba_naiveBayes_tfidf_many_texts(df_reviews)
    elif method == 'bert':
        return count_proba_BERT_many_texts(df_reviews)
    elif method == 'lstm':
        return count_proba_LSTM_many_texts(df_reviews)


def extract_keywords_csv(df_reviews, method, n_kw):
    if method == 'keybert':
        return get_keywords_many_texts_keyBert(df_reviews, n_kw)
    elif method == 'rake':
        return get_keywords_many_texts_rake(df_reviews, n_kw)
    elif method == 'yake':
        return get_keywords_many_texts_yake(df_reviews, n_kw)


def summarize_texts_csv(reviews, method, ratio):
    if method == 'bert':
        return summarize_many_bert(reviews, ratio)
    elif method == 'gpt2':
        return summarize_many_gpt2(reviews, ratio)
    elif method == 'luhn':
        return summarize_many_luhn(reviews, ratio)
    elif method == 'textrank':
        return summarize_many_textrank(reviews, ratio)


def count_reviews_positive_and_negative(sentiments):
    pos = 0
    neg = 0

    for sentiment in sentiments:
        if float(sentiment['prob_pos']) > 0.5:
            pos += 1
        else:
            neg += 1

    return pos, neg


def get_all_keywords(keywords_list):
    all_keywords = set()
    for keywords in keywords_list:
        for k in keywords:
            all_keywords.add(k)
    return list(all_keywords)
