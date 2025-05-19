	.file	"app.c"
	.intel_syntax noprefix
	.text
	.def	printf;	.scl	3;	.type	32;	.endef
	.seh_proc	printf
printf:
	push	rbp
	.seh_pushreg	rbp
	push	rbx
	.seh_pushreg	rbx
	sub	rsp, 56
	.seh_stackalloc	56
	lea	rbp, 48[rsp]
	.seh_setframe	rbp, 48
	.seh_endprologue
	mov	QWORD PTR 32[rbp], rcx
	mov	QWORD PTR 40[rbp], rdx
	mov	QWORD PTR 48[rbp], r8
	mov	QWORD PTR 56[rbp], r9
	lea	rax, 40[rbp]
	mov	QWORD PTR -16[rbp], rax
	mov	rbx, QWORD PTR -16[rbp]
	mov	ecx, 1
	mov	rax, QWORD PTR __imp___acrt_iob_func[rip]
	call	rax
	mov	rcx, rax
	mov	rax, QWORD PTR 32[rbp]
	mov	r8, rbx
	mov	rdx, rax
	call	__mingw_vfprintf
	mov	DWORD PTR -4[rbp], eax
	mov	eax, DWORD PTR -4[rbp]
	add	rsp, 56
	pop	rbx
	pop	rbp
	ret
	.seh_endproc
	.def	time;	.scl	3;	.type	32;	.endef
	.seh_proc	time
time:
	push	rbp
	.seh_pushreg	rbp
	mov	rbp, rsp
	.seh_setframe	rbp, 0
	sub	rsp, 32
	.seh_stackalloc	32
	.seh_endprologue
	mov	QWORD PTR 16[rbp], rcx
	mov	rax, QWORD PTR 16[rbp]
	mov	rcx, rax
	mov	rax, QWORD PTR __imp__time64[rip]
	call	rax
	add	rsp, 32
	pop	rbp
	ret
	.seh_endproc
	.def	__main;	.scl	2;	.type	32;	.endef
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
	push	rbp
	.seh_pushreg	rbp
	mov	rbp, rsp
	.seh_setframe	rbp, 0
	sub	rsp, 160
	.seh_stackalloc	160
	.seh_endprologue
	call	__main
	mov	ecx, 0
	call	time
	mov	ecx, eax
	call	srand
	lea	rax, -128[rbp]
	mov	r8d, 5
	mov	edx, 6
	mov	rcx, rax
	call	fillArray
	lea	rax, -128[rbp]
	mov	r8d, 5
	mov	edx, 6
	mov	rcx, rax
	call	printArray
	lea	rax, -128[rbp]
	mov	r8d, 5
	mov	edx, 6
	mov	rcx, rax
	call	sortArray
	lea	rax, -128[rbp]
	mov	r8d, 5
	mov	edx, 6
	mov	rcx, rax
	call	printArray
	mov	eax, 0
	add	rsp, 160
	pop	rbp
	ret
	.seh_endproc
	.globl	fillArray
	.def	fillArray;	.scl	2;	.type	32;	.endef
	.seh_proc	fillArray
fillArray:
	push	rbp
	.seh_pushreg	rbp
	mov	rbp, rsp
	.seh_setframe	rbp, 0
	sub	rsp, 48
	.seh_stackalloc	48
	.seh_endprologue
	mov	QWORD PTR 16[rbp], rcx
	mov	DWORD PTR 24[rbp], edx
	mov	DWORD PTR 32[rbp], r8d
	mov	DWORD PTR -4[rbp], 0
	jmp	.L8
.L11:
	mov	DWORD PTR -8[rbp], 0
	jmp	.L9
.L10:
	call	rand
	mov	edx, DWORD PTR -4[rbp]
	mov	ecx, edx
	imul	ecx, DWORD PTR 32[rbp]
	mov	edx, DWORD PTR -8[rbp]
	add	edx, ecx
	movsx	rdx, edx
	lea	rcx, 0[0+rdx*4]
	mov	rdx, QWORD PTR 16[rbp]
	lea	r8, [rcx+rdx]
	movsx	rdx, eax
	imul	rdx, rdx, 1374389535
	shr	rdx, 32
	sar	edx, 5
	mov	ecx, eax
	sar	ecx, 31
	sub	edx, ecx
	imul	ecx, edx, 100
	sub	eax, ecx
	mov	edx, eax
	mov	DWORD PTR [r8], edx
	add	DWORD PTR -8[rbp], 1
.L9:
	mov	eax, DWORD PTR -8[rbp]
	cmp	eax, DWORD PTR 32[rbp]
	jl	.L10
	add	DWORD PTR -4[rbp], 1
.L8:
	mov	eax, DWORD PTR -4[rbp]
	cmp	eax, DWORD PTR 24[rbp]
	jl	.L11
	nop
	nop
	add	rsp, 48
	pop	rbp
	ret
	.seh_endproc
	.globl	sortArray
	.def	sortArray;	.scl	2;	.type	32;	.endef
	.seh_proc	sortArray
sortArray:
	push	rbp
	.seh_pushreg	rbp
	mov	rbp, rsp
	.seh_setframe	rbp, 0
	sub	rsp, 32
	.seh_stackalloc	32
	.seh_endprologue
	mov	QWORD PTR 16[rbp], rcx
	mov	DWORD PTR 24[rbp], edx
	mov	DWORD PTR 32[rbp], r8d
	mov	DWORD PTR -4[rbp], 0
	jmp	.L13
.L20:
	mov	DWORD PTR -8[rbp], 1
	jmp	.L14
.L19:
	mov	eax, DWORD PTR -4[rbp]
	imul	eax, DWORD PTR 32[rbp]
	mov	edx, eax
	mov	eax, DWORD PTR -8[rbp]
	add	eax, edx
	cdqe
	lea	rdx, 0[0+rax*4]
	mov	rax, QWORD PTR 16[rbp]
	add	rax, rdx
	mov	eax, DWORD PTR [rax]
	mov	DWORD PTR -20[rbp], eax
	mov	DWORD PTR -12[rbp], 0
	jmp	.L15
.L16:
	add	DWORD PTR -12[rbp], 1
.L15:
	mov	eax, DWORD PTR -4[rbp]
	imul	eax, DWORD PTR 32[rbp]
	mov	edx, eax
	mov	eax, DWORD PTR -12[rbp]
	add	eax, edx
	cdqe
	lea	rdx, 0[0+rax*4]
	mov	rax, QWORD PTR 16[rbp]
	add	rax, rdx
	mov	eax, DWORD PTR [rax]
	cmp	DWORD PTR -20[rbp], eax
	jl	.L16
	mov	eax, DWORD PTR -8[rbp]
	sub	eax, 1
	mov	DWORD PTR -16[rbp], eax
	jmp	.L17
.L18:
	mov	eax, DWORD PTR -4[rbp]
	imul	eax, DWORD PTR 32[rbp]
	mov	edx, eax
	mov	eax, DWORD PTR -16[rbp]
	add	eax, edx
	cdqe
	lea	rdx, 0[0+rax*4]
	mov	rax, QWORD PTR 16[rbp]
	lea	rcx, [rdx+rax]
	mov	eax, DWORD PTR -4[rbp]
	imul	eax, DWORD PTR 32[rbp]
	mov	edx, eax
	mov	eax, DWORD PTR -16[rbp]
	add	eax, edx
	cdqe
	add	rax, 1
	lea	rdx, 0[0+rax*4]
	mov	rax, QWORD PTR 16[rbp]
	add	rdx, rax
	mov	eax, DWORD PTR [rcx]
	mov	DWORD PTR [rdx], eax
	sub	DWORD PTR -16[rbp], 1
.L17:
	mov	eax, DWORD PTR -16[rbp]
	cmp	eax, DWORD PTR -12[rbp]
	jge	.L18
	mov	eax, DWORD PTR -4[rbp]
	imul	eax, DWORD PTR 32[rbp]
	mov	edx, eax
	mov	eax, DWORD PTR -12[rbp]
	add	eax, edx
	cdqe
	lea	rdx, 0[0+rax*4]
	mov	rax, QWORD PTR 16[rbp]
	add	rdx, rax
	mov	eax, DWORD PTR -20[rbp]
	mov	DWORD PTR [rdx], eax
	add	DWORD PTR -8[rbp], 1
.L14:
	mov	eax, DWORD PTR -8[rbp]
	cmp	eax, DWORD PTR 32[rbp]
	jl	.L19
	add	DWORD PTR -4[rbp], 1
.L13:
	mov	eax, DWORD PTR -4[rbp]
	cmp	eax, DWORD PTR 24[rbp]
	jl	.L20
	nop
	nop
	add	rsp, 32
	pop	rbp
	ret
	.seh_endproc
	.section .rdata,"dr"
.LC0:
	.ascii "%3d\0"
.LC1:
	.ascii "\12\0"
	.text
	.globl	printArray
	.def	printArray;	.scl	2;	.type	32;	.endef
	.seh_proc	printArray
printArray:
	push	rbp
	.seh_pushreg	rbp
	mov	rbp, rsp
	.seh_setframe	rbp, 0
	sub	rsp, 48
	.seh_stackalloc	48
	.seh_endprologue
	mov	QWORD PTR 16[rbp], rcx
	mov	DWORD PTR 24[rbp], edx
	mov	DWORD PTR 32[rbp], r8d
	mov	DWORD PTR -4[rbp], 0
	jmp	.L22
.L25:
	mov	DWORD PTR -8[rbp], 0
	jmp	.L23
.L24:
	mov	eax, DWORD PTR -4[rbp]
	imul	eax, DWORD PTR 32[rbp]
	mov	edx, eax
	mov	eax, DWORD PTR -8[rbp]
	add	eax, edx
	cdqe
	lea	rdx, 0[0+rax*4]
	mov	rax, QWORD PTR 16[rbp]
	add	rax, rdx
	mov	eax, DWORD PTR [rax]
	mov	edx, eax
	lea	rax, .LC0[rip]
	mov	rcx, rax
	call	printf
	add	DWORD PTR -8[rbp], 1
.L23:
	mov	eax, DWORD PTR -8[rbp]
	cmp	eax, DWORD PTR 32[rbp]
	jl	.L24
	lea	rax, .LC1[rip]
	mov	rcx, rax
	call	printf
	add	DWORD PTR -4[rbp], 1
.L22:
	mov	eax, DWORD PTR -4[rbp]
	cmp	eax, DWORD PTR 24[rbp]
	jl	.L25
	lea	rax, .LC1[rip]
	mov	rcx, rax
	call	printf
	nop
	add	rsp, 48
	pop	rbp
	ret
	.seh_endproc
	.ident	"GCC: (MinGW-W64 x86_64-msvcrt-mcf-seh, built by Brecht Sanders) 13.1.0"
	.def	__mingw_vfprintf;	.scl	2;	.type	32;	.endef
	.def	srand;	.scl	2;	.type	32;	.endef
	.def	rand;	.scl	2;	.type	32;	.endef
