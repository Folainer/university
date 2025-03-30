PROCEDURE GREET;
BEGIN
    GOTO 12;
    ($ 
        MOV DWORD PTR [eax], 11
    $)
    20: 30: RETURN;
END;