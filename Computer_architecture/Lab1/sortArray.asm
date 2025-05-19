sortArray:
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-24], rdi
        mov     DWORD PTR [rbp-28], esi
        mov     DWORD PTR [rbp-32], edx
        mov     DWORD PTR [rbp-4], 0
        jmp     .L9
.L14:
        mov     DWORD PTR [rbp-8], 2
        jmp     .L10
.L13:
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-8]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-24]
        lea     rcx, [rdx+rax]
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-24]
        add     rdx, rax
        mov     eax, DWORD PTR [rcx]
        mov     DWORD PTR [rdx], eax
        mov     eax, DWORD PTR [rbp-8]
        mov     DWORD PTR [rbp-12], eax
        jmp     .L11
.L12:
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-12]
        add     eax, edx
        cdqe
        sal     rax, 2
        lea     rdx, [rax-4]
        mov     rax, QWORD PTR [rbp-24]
        lea     rcx, [rdx+rax]
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-12]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-24]
        add     rdx, rax
        mov     eax, DWORD PTR [rcx]
        mov     DWORD PTR [rdx], eax
        sub     DWORD PTR [rbp-12], 1
.L11:
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-24]
        add     rax, rdx
        mov     edx, DWORD PTR [rax]
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        mov     ecx, eax
        mov     eax, DWORD PTR [rbp-12]
        add     eax, ecx
        cdqe
        sal     rax, 2
        lea     rcx, [rax-4]
        mov     rax, QWORD PTR [rbp-24]
        add     rax, rcx
        mov     eax, DWORD PTR [rax]
        cmp     edx, eax
        jl      .L12
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-24]
        lea     rcx, [rdx+rax]
        mov     eax, DWORD PTR [rbp-4]
        imul    eax, DWORD PTR [rbp-32]
        mov     edx, eax
        mov     eax, DWORD PTR [rbp-12]
        add     eax, edx
        cdqe
        lea     rdx, [0+rax*4]
        mov     rax, QWORD PTR [rbp-24]
        add     rdx, rax
        mov     eax, DWORD PTR [rcx]
        mov     DWORD PTR [rdx], eax
        add     DWORD PTR [rbp-8], 1
.L10:
        mov     eax, DWORD PTR [rbp-8]
        cmp     eax, DWORD PTR [rbp-32]
        jl      .L13
        add     DWORD PTR [rbp-4], 1
.L9:
        mov     eax, DWORD PTR [rbp-4]
        cmp     eax, DWORD PTR [rbp-28]
        jl      .L14
        nop
        nop
        pop     rbp
        ret