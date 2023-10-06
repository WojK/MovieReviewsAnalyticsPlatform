import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline


def count_proba_BERT_text(text):
    model_bert_folder = os.path.abspath('./features/sentimentAnalysis/Models/BERT/')
    bert_tokenizer_folder = os.path.abspath('./features/sentimentAnalysis/Models/BERT/tokenizer')

    model_bert = AutoModelForSequenceClassification.from_pretrained(model_bert_folder)
    bert_tokenizer = AutoTokenizer.from_pretrained(bert_tokenizer_folder)
    bert_pipe = pipeline("text-classification", model=model_bert, tokenizer=bert_tokenizer, top_k=None)
    result = bert_pipe([text])[0]
    pos = 0
    neg = 0
    for sentiment in result:
        if sentiment['label'] == 'LABEL_1':
            pos = sentiment['score']
        elif sentiment['label'] == 'LABEL_0':
            neg = sentiment['score']

    prob_pos = "{:.2f}".format(float(pos))
    prob_neg = "{:.2f}".format(float(neg))

    return {"prob_pos": prob_pos, "prob_neg": prob_neg}


def count_proba_BERT_many_texts(texts):
    model_bert_folder = os.path.abspath('./features/sentimentAnalysis/Models/BERT/')
    bert_tokenizer_folder = os.path.abspath('./features/sentimentAnalysis/Models/BERT/tokenizer')

    model_bert = AutoModelForSequenceClassification.from_pretrained(model_bert_folder)
    bert_tokenizer = AutoTokenizer.from_pretrained(bert_tokenizer_folder)
    bert_pipe = pipeline("text-classification", model=model_bert, tokenizer=bert_tokenizer, top_k=None)
    result = bert_pipe([text[0:512] for text in texts])

    output = []
    for prediction in result:
        pos = 0
        neg = 0
        for score in prediction:
            if score['label'] == 'LABEL_1':
                pos = score['score']
            elif score['label'] == 'LABEL_0':
                neg = score['score']
        output.append({"prob_pos": "{:.2f}".format(float(pos)), "prob_neg": "{:.2f}".format(float(neg))})

    return output
