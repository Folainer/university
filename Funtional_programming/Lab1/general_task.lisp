;; General task

;; global variables
(defvar *lst-last* nil)

;; constucting a list with required paramaters
(format t "~%~%task1")
(print '('(a) 3 '(a b c) nil))

;; getting a list head
(format t "~%~%task2")
(print (car (list 1 2 3 4 5)))

;; get tail of the list
(format t "~%~%task3")
(print (cdr '(1 2 3 4)))
(print (rest '(1 2 3 4)))

;; trying to get the third item in the list
(format t "~%~%task4")
(print (third '(1 2 3 4)))
(print (nth 2 '(1 2 3 4)))
(print (car (cdr (cdr '(1 2 3 4)))))

;; getting the last element
(format t "~%~%task5")
(print (car (last '(1 2 3 4))))
(setf *lst-last* '(1 2 3 4))
(print (nth (1- (length *lst-last*)) *lst-last*))
(print (car (cdr (cdr (cdr '(1 2 3 4))))))

;; usage atom and listp
(format t "~%~%task6")
(print (atom ()))
(print (atom '(1 3)))
(print (atom '(a b)))
(print (atom 1))
(print (listp ()))
(print (listp '(1 3)))
(print (listp '(a b)))
(print (listp 1))

;; usage other predicates
(format t "~%~%task7")
(print (eq 'a 'b)) ; is the same object?
(print (eq 'a 'a))
(print (eq 1 1))
(print (eq 1 1.0))
(print (eq '(a b) '(a b)))

(format t "~%")

(print (eql 'a 'b)) ; comparison for string, numbers
(print (eql 'a 'a))
(print (eql 1 1))
(print (eql 1 1.0))
(print (eql '(a b) '(a b)))

(format t "~%")

(print (equal 'a 'b)) ; comparison for string, numbers, lists
(print (equal 'a 'a))
(print (equal 1 1))
(print (equal 1 1.0))
(print (equal '(a b) '(a b)))

(format t "~%")

(print (equalp 'a 'b)) 
	; comparison for string, numbers, lists, different types
(print (equalp 'a 'a))
(print (equalp 1 1))
(print (equalp 1 1.0))
(print (equalp '(a b) '(a b)))

(format t "~%")

(print (numberp "1"))
(print (numberp 1))

(format t "~%")

(print (zerop 1))
(print (zerop 0))

(format t "~%")

(print (plusp 1))
(print (plusp 0))

(format t "~%")

(print (evenp 1))
(print (evenp 0))

(format t "~%task8")
(print (append *lst-last* '(1 2) (cdr *lst-last*)))






































       
