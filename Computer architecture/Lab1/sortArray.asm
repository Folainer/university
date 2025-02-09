sortArray:
        push    rbp
        mov     rbp, rsp
        ; initialising local variables into a stack
        mov     QWORD PTR [rbp-40], rdi
        mov     DWORD PTR [rbp-44], esi
        mov     DWORD PTR [rbp-48], edx
        ; i loop condition is initialized : int i = 0
        mov     DWORD PTR [rbp-4], 0
        jmp     .L9
.L16:
        ; i loop body starts
        ; j loop condition initialisation : int j = 1
        mov     DWORD PTR [rbp-8], 1
        jmp     .L10
.L15:
        ; j loop body starts
        ; it gets element into a buffer variable (to this line: mov DWORD PTR [rbp-20], eax) : int buf = arr[i*n + j];
        ; firstly calculate shift in the array and then this shift adds with the shift from the start of the array
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-48]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-8]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-40]
        add     rax, rdx
        mov     eax, DWORD PTR [rax]
        mov     DWORD PTR [rbp-20], eax
        ; set k to 0 : int k = 0;
        mov     DWORD PTR [rbp-12], 0
        jmp     .L11
.L12:
        ; k loop body (one command) : k++;
        add     DWORD PTR [rbp-12], 1
.L11:
        ; k loop condition : buf < arr[i*n + k]
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-48]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-12]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-40]
        add     rax, rdx
        mov     eax, DWORD PTR [rax]
        cmp     DWORD PTR [rbp-20], eax
        jl      .L12
        ; l loop the condition variable is initialized : int l = j - 1;
        mov     eax, DWORD PTR [rbp-8]
        sub     eax, 1
        mov     DWORD PTR [rbp-16], eax
        jmp     .L13
.L14:
        ; k l loop body starts : arr[i * n + l + 1] = arr[i * n + l];
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-48]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-16]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-40]
        lea     rcx, [rdx+rax]
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-48]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-16]
        add     eax, edx
        cdqe
        add     rax, 1
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-40]
        add     rdx, rax
        mov     eax, DWORD PTR [rcx]
        mov     DWORD PTR [rdx], eax
        ; k l loop body ends
        ; l loop decrement : l--
        sub     DWORD PTR [rbp-16], 1
.L13:
        ; l loop condition check : l >= k
        mov     eax, DWORD PTR [rbp-16]
        cmp     eax, DWORD PTR [rbp-12]
        jge     .L14
        ; seting element of array to a buffer value : arr[i * n + k] = buf;
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-48]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-12]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-40]
        add     rdx, rax
        mov     eax, DWORD PTR [rbp-20]
        mov     DWORD PTR [rdx], eax
        ; j loop condition increment : j++
        add     DWORD PTR [rbp-8], 1
.L10:
        ; j loop condition condition check : j < n
        mov     eax, DWORD PTR [rbp-8]
        cmp     eax, DWORD PTR [rbp-48]
        jl      .L15
        ; j loop ends
        ; i loop condition increment : i++
        add     DWORD PTR [rbp-4], 1
.L9:
        ; i loop condition check : i < m
        mov     eax, DWORD PTR [rbp-4]
        cmp     eax, DWORD PTR [rbp-44]
        jl      .L16
        ; i loop ends
        nop
        nop
        pop     rbp
        ret
        ; function ends with no returning value
.LC0:
        .string "%3d"