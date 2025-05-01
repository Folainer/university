PROCEDURE GREET;
LABEL 10, 23, 11;
BEGIN
    23: 11: RETURN;
    ($ 
    MOV EAX, 2 
    INT 10h
    $)
    12: 10: GOTO 23;
    GOTO 10;
END;