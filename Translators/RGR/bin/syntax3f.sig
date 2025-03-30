PROCEDURE GREET;
BEGIN
    GOTO 12;
    RANDOM 10;
    ($ 
        MOV DWORD PTR [eax], 11
    $)
    20: 30: RETURN;
END;