import os
import pickle
import tensorflow as tf
import numpy as np


def count_proba_LSTM_text(text):
    tokenizer_filename = os.path.abspath('./features/sentimentAnalysis/Models/LSTM/LSTM_tokenizer.pickle')
    tokenizer = pickle.load(open(tokenizer_filename, 'rb'))

    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/LSTM/LSTM.h5')
    model = tf.keras.models.load_model(model_filename)

    max_len = 595
    trunc_type = 'post'
    padding_type = 'post'
    text = tokenizer.texts_to_sequences([text])
    text = tf.keras.utils.pad_sequences(text, maxlen=max_len, padding=padding_type, truncating=trunc_type)
    text = np.reshape(text, (1, max_len))
    prediction = model.predict(text)
    prob_pos = prediction[0][0]
    prob_neg = 1 - prediction[0][0]
    prob_pos = "{:.2f}".format(float(prob_pos))
    prob_neg = "{:.2f}".format(float(prob_neg))

    return {"prob_pos": prob_pos, "prob_neg": prob_neg}


def count_proba_LSTM_many_texts(texts):
    tokenizer_filename = os.path.abspath('./features/sentimentAnalysis/Models/LSTM/LSTM_tokenizer.pickle')
    tokenizer = pickle.load(open(tokenizer_filename, 'rb'))

    model_filename = os.path.abspath('./features/sentimentAnalysis/Models/LSTM/LSTM.h5')
    model = tf.keras.models.load_model(model_filename)

    max_len = 595
    trunc_type = 'post'
    padding_type = 'post'
    sequences = tokenizer.texts_to_sequences(texts)
    sequences = tf.keras.utils.pad_sequences(sequences, maxlen=max_len, padding=padding_type, truncating=trunc_type)
    prediction = model.predict(sequences)
    scores = [score[0] for score in prediction]
    output = []
    for score in scores:
        output.append({"prob_pos": "{:.2f}".format(float(score)), "prob_neg": "{:.2f}".format(float(1 - score))})

    return output
