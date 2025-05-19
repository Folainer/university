
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
    int A[M][N+1];

    fillArray(&A[0][0], M, N + 1);

    printArray(&A[0][0], M, N + 1);

    sortArray(&A[0][0], M, N + 1);

    printArray(&A[0][0], M, N + 1);

    return 0;
}

void fillArray(int *arr, int m, int n) {
    for (int i = 0; i < m; i++) {
        for (int j = 1; j < n; j++) {
            arr[i * n + j] = rand() % 100;
        }
    }
}

void sortArray(int *arr, int m, int n) {
    for (int i = 0; i < m; i++) {
        for (int j = 2; j < n; j++) {
            arr[i*n + 0] = arr[i*n + j];
            int k = j;
            while (arr[i*n + 0] < arr[i*n + k - 1]) {
                arr[i* n + k] = arr[i*n + k - 1];
                k--;
            }

            arr[i * n + k] = arr[i * n + 0];
        }
    }
}

void printArray(int *arr, int m, int n) {
    for (int i = 0; i < m; i++) {
        for (int j = 1; j < n; j++) {
            printf("%3d", arr[i * n + j]);
        }
        printf("\n");
    }
    printf("\n");
}