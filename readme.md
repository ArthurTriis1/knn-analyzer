# Projeto de inteligência artificial

Aplicação do algoritmo KNN para análise e predição de dados de possível diabetes.

Por: Arthur Andrade

# Objetivos

O presente relatório se propõe a aplicar e discutir os resultados de técnicas de análise matemáticas a partir do algoritmo KNN (K nearest neighboors) em um modelo preditivo de Diabetes.

# Introdução

## O Modelo

O algoritmo KNN é um dos algoritmos classificadores mais simples e de rápida compreensão, ainda sim, obtendo bons resultados dependendo de sua aplicação. A ideia dele é determinar a classe de um série de dados numéricos a partir dos valores de seus vizinhos, analisando a maior aproximação.

No presente relatório foi utilizado o modelo preditivo baseado no cálculo da distância **euclidiana,** que pode ser visto abaixo.

$$
D_E(p,q) = \sqrt{(p_1 - q_1)^2 + \cdots + (p_n - q_n)^2} = \sqrt{\sum_{i=1}^n (p_i - q_i)^2}
\tag{1}
$$

## A base de dados

A base de dados escolhida foi retirada das bases de dados padrões no software WEKA, a partir do arquivo _diabetes.arff._ A base data de 9 de maio de 1990 e a população é residente de Phoenix, Arizona, EUA.

### Instancias

A base de dados conta com 768 instancias de dados, desbalanceados com 500 das classes como '_tested_negative_' e 268 '_tested_positive_'. A base foi analisada no Weka e segue abaixo.

![Untitled](https://user-images.githubusercontent.com/51174217/121831795-c8c22d80-cc9e-11eb-8b77-a3bc2ec550f4.png)


### Atributos

A base conta com 8 atributos numéricos e a classe que define se a diabetes foi positiva ou negativa.

1. preg - Number of times pregnant
2. plas - Plasma glucose concentration a 2 hours in an oral glucose tolerance test
3. pres - Diastolic blood pressure (mm Hg)
4. skin - Triceps skin fold thickness (mm)
5. insu - 2-Hour serum insulin (mu U/ml)
6. mass - Body mass index (weight in kg/(height in m)^2)
7. pedi - Diabetes pedigree function
8. age - Age (years)
9. class - Class variable { tested_negative, tested_positive}

# Metodologia

## Conversão

Primeiramente foi preciso converter o arquivo ._arff_ em um ._csv_, para isso os dados foram copiados e importados para o Google Spreadsheets, como os dados já estavam separados por vírgulas o processo foi simples, só foi preciso definir as _labels_ de forma manual.

## Normalização

Com os dados em uma planilha foi mais simples perceber se haviam dados faltantes, na base existiam uma série de dados zerados, mas como na documentação não era definido se esses dados eram faltantes, preferi não modifica-los.

## Definição dos conjuntos

Como a base estava desbalanceada, foi preciso separar, dos 768, 400 dados aleatórios, sendo eles 200 positivos e 200 negativos. Os 368 restantes foram usados para testes, assim formaram-se 2 arquivos DiabetesDatabase.csv (Com 400 dados) e o DiabetesTeste.csv (Com 368 dados para teste).

## Implementação

O algoritmo foi desenvolvido usando a linguagem Typescript e a biblioteca _csv-parse._

Foram construídas algumas funções utilitárias para tratamento do ._csv_ e uma para cálculo da distância euclidiana e também 2 classes.

A primeira, chamada KNN, que recebe o número de vizinhos analisados, a base de dados á ser usada para treinamento e a lista de resultados da base e oferece a função pública _predict_ que a partir de um conjunto de dados retorna a classe encontrada e os _k_ vizinhos mais próximos.

A segunda classe se chama KnnTester, usada para avaliar o desempenho de um classificador Knn, ela recebe o classificador à ser testado, a base de dados de teste, os labels da base de dados e classe considerada "verdadeira" para análise da matriz confusão.

# Resultados e discussões

O resultado dos testes são retornados em formato JSON, com cada campo descrito abaixo:

```json
{
  asserts: // Total de acertos do modelo
  errors: // Total de erros do modelo
  confusion: { // Matriz confusão
    truePositives: // Verdadeiro positivo
    trueNegatives: // Verdadeiro negativo
    fakePositives: // Falso positivo
    fakeNegatives: // Falso negativo
  }
}
```

Resultado com _k_ vizinhos:

### 1 Vizinho

```json
{
  "asserts": 239,
  "errors": 129,
  "confusion": {
    "truePositives": 43,
    "trueNegatives": 196,
    "fakePositives": 104,
    "fakeNegatives": 25
  }
}
```

### 3 Vizinhos

```json
{
  "asserts": 257,
  "errors": 111,
  "confusion": {
    "truePositives": 53,
    "trueNegatives": 204,
    "fakePositives": 96,
    "fakeNegatives": 15
  }
}
```

### 5 Vizinhos

```json
{
  "asserts": 257,
  "errors": 111,
  "confusion": {
    "truePositives": 51,
    "trueNegatives": 206,
    "fakePositives": 94,
    "fakeNegatives": 17
  }
}
```

### 7 Vizinhos

```json
{
  "asserts": 259,
  "errors": 109,
  "confusion": {
    "truePositives": 57,
    "trueNegatives": 202,
    "fakePositives": 98,
    "fakeNegatives": 11
  }
}
```

### 9 Vizinhos

```json
{
  "asserts": 258,
  "errors": 110,
  "confusion": {
    "truePositives": 59,
    "trueNegatives": 199,
    "fakePositives": 101,
    "fakeNegatives": 9
  }
}
```

Nessas análises é possível ver que a média de acertos é maior que a metade da base, mas que não á grande variação mesmo com o aumento de vizinhos e o máximo de acerto se dá em 7, acima disso a quantidade de erros acaba aumentando, mesmo que pouco.

# Referências

Base de dados: [https://docs.google.com/spreadsheets/d/1IdTtF6oSN0F2YYgZGOP4lP9kz-vtHXlY-5JzcDeXYXs/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1IdTtF6oSN0F2YYgZGOP4lP9kz-vtHXlY-5JzcDeXYXs/edit?usp=sharing)

[http://liferayui.com/building-knn-algorithm/](http://liferayui.com/building-knn-algorithm/)

[http://computacaointeligente.com.br/algoritmos/k-vizinhos-mais-proximos/](http://computacaointeligente.com.br/algoritmos/k-vizinhos-mais-proximos/)

[https://medium.com/brasil-ai/knn-k-nearest-neighbors-2-f2ab9e5662b](https://medium.com/brasil-ai/knn-k-nearest-neighbors-2-f2ab9e5662b)

[https://medium.com/brasil-ai/knn-3-codando-nosso-classificador-de-câncer-de-mama-eadd3b41b54b](https://medium.com/brasil-ai/knn-3-codando-nosso-classificador-de-c%C3%A2ncer-de-mama-eadd3b41b54b)
