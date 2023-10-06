import pickle
from features.processTextUtils.text_utils import process_remove_punctuation
import os


def count_proba_logisticRegression_cv_text(text):
    processed_text = process_remove_punctuation(text)
    model_filename = os.path.abspath("./features/sentimentAnalysis/Models/LogisticRegression/logistic_regresion_cv.sav")
    model_vectorizer_filename = os.path.abspath('./features/sentimentAnalysis/Models/LogisticRegression'
                                                '/logistic_regresion_cv_vectorizer.sav')

    model = pickle.load(open(model_filename, 'rb'))
    vectorizer = pickle.load(open(model_vectorizer_filename, 'rb'))

    text_vectorized = vectorizer.transform([processed_text])
    prob_neg, prob_pos = model.predict_proba(text_vectorized)[0]

    prob_pos = "{:.2f}".format(float(prob_pos))
    prob_neg = "{:.2f}".format(float(prob_neg))

    return {"prob_pos": prob_pos, "prob_neg": prob_neg}


def count_proba_logisticRegression_cv_many_texts(texts):
    texts = texts.apply(process_remove_punctuation)
    model_filename = os.path.abspath("./features/sentimentAnalysis/Models/LogisticRegression/logistic_regresion_cv.sav")
    model_vectorizer_filename = os.path.abspath('./features/sentimentAnalysis/Models/LogisticRegression'
                                                '/logistic_regresion_cv_vectorizer.sav')

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


def count_proba_logisticRegression_tfidf_text(text):
    processed_text = process_remove_punctuation(text)
    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/LogisticRegression/logistic_regresion_tfidf'
                                     '.sav')
    model_vectorizer_filename = os.path.abspath('./features/sentimentAnalysis/Models/LogisticRegression'
                                                '/logistic_regresion_tfidf_vectorizer.sav')

    model = pickle.load(open(model_filename, 'rb'))
    vectorizer = pickle.load(open(model_vectorizer_filename, 'rb'))

    text_vectorized = vectorizer.transform([processed_text])
    prob_neg, prob_pos = model.predict_proba(text_vectorized)[0]

    prob_pos = "{:.2f}".format(float(prob_pos))
    prob_neg = "{:.2f}".format(float(prob_neg))

    return {"prob_pos": prob_pos, "prob_neg": prob_neg}


def count_proba_logisticRegression_tfidf_many_texts(texts):
    texts = texts.apply(process_remove_punctuation)
    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/LogisticRegression/logistic_regresion_tfidf'
                                     '.sav')
    model_vectorizer_filename = os.path.abspath('./features/sentimentAnalysis/Models/LogisticRegression'
                                                '/logistic_regresion_tfidf_vectorizer.sav')

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
