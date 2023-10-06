import nltk
from nltk.corpus import stopwords
from string import punctuation
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

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


def calculate_sentence(processed_sentence, most_common_words, distance):
    most_common_words_indexes = []
    for word in most_common_words:
        try:
            index = processed_sentence.index(word)
            most_common_words_indexes.append(index)
        except ValueError:
            pass
    most_common_words_indexes.sort()

    i = 1
    groups = []
    if len(most_common_words_indexes) > 0:
        group = [most_common_words_indexes[0]]
        while i < len(most_common_words_indexes):
            if most_common_words_indexes[i] - most_common_words_indexes[i - 1] < distance:
                group.append(most_common_words_indexes[i])
            else:
                groups.append(group.copy())
                group = [most_common_words_indexes[i]]
            i = i + 1
        groups.append(group)

    highest_score = 0
    for g in groups:
        common_words = len(g)
        all_words = g[-1] - g[0] + 1
        score = 1.0 * common_words ** 2 / all_words
        if score > highest_score:
            highest_score = score

    return highest_score


# four or five - distance
# n_top_words - 10%


def summarize_luhn(text, ratio):
    distance = 5
    sentences = nltk.sent_tokenize(text)
    processed_sentences = [process_and_tokenize(s, stop) for s in sentences]
    words = []
    for sent in processed_sentences:
        for word in sent:
            words.append(word)
    fdist = nltk.FreqDist(words)
    fdist_len = fdist.B()
    n_top_words = int(fdist_len / 10)
    most_common_words = [word[0] for word in fdist.most_common(n_top_words)]
    sentence_scores = []
    i = 0
    for sent in processed_sentences:
        score = calculate_sentence(sent, most_common_words, distance)
        sentence_scores.append((i, score))
        i = i + 1

    n = int(ratio / 100 * len(sentences))
    sentence_scores = sorted(sentence_scores, key=lambda s: s[1], reverse=True)[0:n]
    most_important_sentences_indexes = [score[0] for score in sentence_scores]

    summarization_sentences = []
    i = 0
    for sent in nltk.sent_tokenize(text):
        if i in most_important_sentences_indexes:
            summarization_sentences.append(sent)
        i = i + 1
    summarization = " ".join(summarization_sentences)
    return summarization


def summarize_many_luhn(texts, ratio):
    output = []

    for text in texts:
        distance = 5
        sentences = nltk.sent_tokenize(text)
        processed_sentences = [process_and_tokenize(s, stop) for s in sentences]
        words = []
        for sent in processed_sentences:
            for word in sent:
                words.append(word)
        fdist = nltk.FreqDist(words)
        fdist_len = fdist.B()
        n_top_words = int(fdist_len / 10)
        most_common_words = [word[0] for word in fdist.most_common(n_top_words)]
        sentence_scores = []
        i = 0
        for sent in processed_sentences:
            score = calculate_sentence(sent, most_common_words, distance)
            sentence_scores.append((i, score))
            i = i + 1

        n = int(ratio / 100 * len(sentences))
        sentence_scores = sorted(sentence_scores, key=lambda s: s[1], reverse=True)[0:n]
        most_important_sentences_indexes = [score[0] for score in sentence_scores]

        summarization_sentences = []
        i = 0
        for sent in nltk.sent_tokenize(text):
            if i in most_important_sentences_indexes:
                summarization_sentences.append(sent)
            i = i + 1
        summarization = " ".join(summarization_sentences)

        output.append(summarization)

    return output
