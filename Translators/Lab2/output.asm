GREET:
    push      rbp
    mov       rbp, rsp
  23:
  11:
    pop       rbp
    ret       
    mov eax, 2
    int 10h   
  10:
    jump      23
    jump      10
    pop       rbp
    ret       
