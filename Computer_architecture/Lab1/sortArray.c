
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
