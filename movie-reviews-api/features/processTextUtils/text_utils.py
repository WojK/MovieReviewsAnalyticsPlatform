from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from string import punctuation

stop = set(stopwords.words('english'))
punctuation = list(punctuation)
stop.update(punctuation)


def process_remove_punctuation(text):
    output = []
    for word in word_tokenize(text.lower()):
        if word.isalpha():
            output.append(word)
    return " ".join(output)


def remove_punctuation_and_stem(text):
    stem_tokens = []
    stemmer = PorterStemmer()
    for word in word_tokenize(text.lower()):
        if word.isalpha():
            stem_word = stemmer.stem(word)
            stem_tokens.append(stem_word)
    return " ".join(stem_tokens)


def remove_punctuation_and_stopwords(text):
    output = []
    for word in word_tokenize(text.lower()):
        if word not in stop and word.isalpha():
            output.append(word)
    return " ".join(output)


def remove_stopwords_and_stem(text):
    stem_tokens = []
    stemmer = PorterStemmer()
    for word in word_tokenize(text.lower()):
        if word not in stop and word.isalpha():
            stem_word = stemmer.stem(word)
            stem_tokens.append(stem_word)
    return " ".join(stem_tokens)


