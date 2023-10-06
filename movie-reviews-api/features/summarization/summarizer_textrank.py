import nltk
import numpy as np
from nltk.corpus import stopwords
from string import punctuation
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from scipy.spatial.distance import cosine
import networkx as nx

stop = set(stopwords.words('english'))
punctuation = list(punctuation)
stop.update(punctuation)


def process_and_tokenize(text, stopwords_set):
    stem_tokens = []
    stemmer = PorterStemmer()
    for word in word_tokenize(text.lower()):
        if word not in stopwords_set and word.isalpha():
            stem_word = stemmer.stem(word)
            stem_tokens.append(stem_word)
    return stem_tokens


def cosine_similarity(sent_1_tokenized, sent_2_tokenized):
    unique_words = list(set(sent_1_tokenized + sent_2_tokenized))
    unique_words_count = len(unique_words)

    vector_1 = [0] * unique_words_count
    vector_2 = [0] * unique_words_count

    for t in sent_1_tokenized:
        vector_1[unique_words.index(t)] += 1
    for t in sent_2_tokenized:
        vector_2[unique_words.index(t)] += 1
    return 1 - cosine(vector_1, vector_2)


def create_numpy_matrix(sentences_tokenized):
    n = len(sentences_tokenized)
    matrix = np.zeros((n, n))
    for row in range(n):
        for col in range(n):
            if row == col:
                continue
            matrix[row][col] = cosine_similarity(sentences_tokenized[row], sentences_tokenized[col])
    return matrix


def page_rank(numpy_matrix):
    graph = nx.from_numpy_array(numpy_matrix)
    ranking = nx.pagerank(graph)
    sorted_indexes = [k for k, v in sorted(ranking.items(), key=lambda item: item[1], reverse=True)]
    return sorted_indexes


def summarize_textrank(text, ratio):
    sent_tokenized = [process_and_tokenize(s, stop) for s in nltk.sent_tokenize(text)]
    matrix = create_numpy_matrix(sent_tokenized)
    ranking = page_rank(matrix)
    n = int(ratio / 100 * len(sent_tokenized))
    most_import_sent_indexes = ranking[0:n]

    summarization_sentences = []
    i = 0
    for sent in nltk.sent_tokenize(text):
        if i in most_import_sent_indexes:
            summarization_sentences.append(sent)
        i = i + 1
    summarization = " ".join(summarization_sentences)

    return summarization


def summarize_many_textrank(texts, ratio):
    output = []

    for text in texts:
        sent_tokenized = [process_and_tokenize(s, stop) for s in nltk.sent_tokenize(text)]
        matrix = create_numpy_matrix(sent_tokenized)
        ranking = page_rank(matrix)
        n = int(ratio / 100 * len(sent_tokenized))
        most_import_sent_indexes = ranking[0:n]

        summarization_sentences = []
        i = 0
        for sent in nltk.sent_tokenize(text):
            if i in most_import_sent_indexes:
                summarization_sentences.append(sent)
            i = i + 1
        summarization = " ".join(summarization_sentences)
        output.append(summarization)

    return output
