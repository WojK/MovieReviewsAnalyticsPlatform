def count_words_avg(texts):
    words_counts = []
    for text in texts:
        words = text.split(' ')
        words_counts.append(len(words))

    sum_counts = 0
    for count in words_counts:
        sum_counts += count

    return int(sum_counts / len(words_counts))