class App {
    final static int N = 6;
    final static int M = 5;
    public static void main(String[] args) {
        int A[][] = new int[M][N + 1];

        fillArray(A, M, N + 1);

        printArray(A, M, N + 1);

        sortArray(A, M, N + 1);

        printArray(A, M, N + 1);
    }

    public static void fillArray(int[][] arr, int m, int n) {
        for (int i = 0; i < m; i++) {
            for (int j = 1; j < n; j++) {
                arr[i][j] = (int) (Math.random() * 100);
            }
        }
    }

    public static void sortArray(int[][] arr, int m, int n) {
        for (int i = 0; i < m; i++) {
            for (int j = 2; j < n; j++) {
                arr[i][0] = arr[i][j];
                int k = j;

                while (arr[i][0] < arr[i][k - 1]) {
                    arr[i][k] = arr[i][k - 1];
                    k--;
                }

                arr[i][k] = arr[i][0];
            }
        }
    }

    public static void printArray(int[][] arr, int m, int n) {
        for (int i = 0; i < m; i++) {
            for (int j = 1; j < n; j++) {
                System.out.print(String.format("%2d ", arr[i][j]));
            }
            System.out.println();
        }
        System.out.println();
    }
}