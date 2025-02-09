// task 
//Варіант No 12
//Задано двовимірний масив (матрицю) цілих чисел A[m][n].
//Відсортувати окремо кожен рядок масиву алгоритмом No3 методу
//вставки (з лінійним пошуком справа з використанням бар’єру) за не-
//збільшенням.

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#define N 5
#define M 6

void fillArray(int*, int, int);
void sortArray(int*, int, int);
void printArray(int*, int, int);

int main() {
    srand(time(NULL));
    int A[M][N];

    fillArray(&A[0][0], M, N);

    printArray(&A[0][0], M, N);

    sortArray(&A[0][0], M, N);

    printArray(&A[0][0], M, N);

    return 0;
}

void fillArray(int *arr, int m, int n) {
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            arr[i * n + j] = rand() % 100;
        }
    }
}

void sortArray(int *arr, int m, int n) {
    for (int i = 0; i < m; i++) {
        for (int j = 1; j < n; j++) {
            int buf = arr[i*n + j];
            int k = 0;
            while (buf < arr[i*n + k]) {
                k++;
            }

            for (int l = j - 1; l >= k; l--) {
                arr[i * n + l + 1] = arr[i * n + l];
            }

            arr[i * n + k] = buf;
        }
    }
}

void printArray(int *arr, int m, int n) {
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            printf("%3d", arr[i * n + j]);
        }
        printf("\n");
    }
    printf("\n");
}