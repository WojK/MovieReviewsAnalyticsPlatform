import pickle
from features.processTextUtils.text_utils import remove_punctuation_and_stopwords
import os


def count_proba_naiveBayes_tfidf_text(text):
    processed_text = remove_punctuation_and_stopwords(text)
    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_tfidf.sav')
    model_vectorizer_filename = os.path.abspath(
        './features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_tfidf_vectorizer.sav')

    model = pickle.load(open(model_filename, 'rb'))
    vectorizer = pickle.load(open(model_vectorizer_filename, 'rb'))

    text_vectorized = vectorizer.transform([processed_text])
    prob_neg, prob_pos = model.predict_proba(text_vectorized)[0]

    prob_pos = "{:.2f}".format(float(prob_pos))
    prob_neg = "{:.2f}".format(float(prob_neg))

    return {"prob_pos": prob_pos, "prob_neg": prob_neg}


def count_proba_naiveBayes_tfidf_many_texts(texts):
    texts = texts.apply(remove_punctuation_and_stopwords)

    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_tfidf.sav')
    model_vectorizer_filename = os.path.abspath(
        './features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_tfidf_vectorizer.sav')

    model = pickle.load(open(model_filename, 'rb'))
    vectorizer = pickle.load(open(model_vectorizer_filename, 'rb'))

    text_vectorized = vectorizer.transform(texts)
    prediction = model.predict_proba(text_vectorized)

    output = []
    for scores in prediction:
        prob_neg, prob_pos = scores
        prob_pos = "{:.2f}".format(float(prob_pos))
        prob_neg = "{:.2f}".format(float(prob_neg))
        output.append({"prob_pos": prob_pos, "prob_neg": prob_neg})

    return output


def count_proba_naiveBayes_cv_text(text):
    processed_text = remove_punctuation_and_stopwords(text)
    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_cv.sav')
    model_vectorizer_filename = os.path.abspath(
        './features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_cv_vectorizer.sav')

    model = pickle.load(open(model_filename, 'rb'))
    vectorizer = pickle.load(open(model_vectorizer_filename, 'rb'))

    text_vectorized = vectorizer.transform([processed_text])
    prob_neg, prob_pos = model.predict_proba(text_vectorized)[0]

    prob_pos = "{:.2f}".format(float(prob_pos))
    prob_neg = "{:.2f}".format(float(prob_neg))

    return {"prob_pos": prob_pos, "prob_neg": prob_neg}


def count_proba_naiveBayes_cv_many_texts(texts):
    texts = texts.apply(remove_punctuation_and_stopwords)

    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_cv.sav')
    model_vectorizer_filename = os.path.abspath(
        './features/sentimentAnalysis/Models/NaiveBayes/naive_bayes_cv_vectorizer.sav')

    model = pickle.load(open(model_filename, 'rb'))
    vectorizer = pickle.load(open(model_vectorizer_filename, 'rb'))

    text_vectorized = vectorizer.transform(texts)
    prediction = model.predict_proba(text_vectorized)

    output = []
    for scores in prediction:
        prob_neg, prob_pos = scores
        prob_pos = "{:.2f}".format(float(prob_pos))
        prob_neg = "{:.2f}".format(float(prob_neg))
        output.append({"prob_pos": prob_pos, "prob_neg": prob_neg})

    return output
