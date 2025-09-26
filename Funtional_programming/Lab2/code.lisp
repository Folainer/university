(defun remove-thirds-and-reverse (lst)
  (remove-thirds-and-reverse-inner lst 0))


(defun remove-thirds-and-reverse-inner (lst index)
  (if lst
    (if (eql (rem (1+ index) 3) 0)
      (remove-thirds-and-reverse-inner (rest lst) (1+ index))
      (append (remove-thirds-and-reverse-inner (rest lst) (1+ index)) (list (first lst))))))


(defun check-remove-thirds-and-reverse (name input expected)
  (format t "~:[FAILED~;passed~]... ~a~%" (equal (remove-thirds-and-reverse input) expected)
	  name))


(defun test-remove-thirds-and-reverse ()
  (format t "test-remove-thirds-and-reverse:~%")
  (check-remove-thirds-and-reverse "test1.1" '(a b c d e f g) '(g e d b a))
  (check-remove-thirds-and-reverse "test1.2" '(1 2 3 (3 4) (5 6)) '((5 6) (3 4) 2 1))
  (check-remove-thirds-and-reverse "test1.3" '((1 2 3)) '((1 2 3)))
  (format t "~%"))



(test-remove-thirds-and-reverse)


(defun remove-all (item lst)
  (cond
    ((not (listp lst)) nil)
    ((null lst) nil)
    ((eql item (first lst)) (remove-all item (rest lst)))
    (t (cons (first lst) (remove-all item (rest lst))))))


(defun list-set-difference (lst1 lst2 lst3)
  (cond
    ((and (first lst2) (first lst3)) (remove-all (first lst2) (remove-all (first lst3) lst1)))
    ((first lst2) (remove-all (first lst2) lst1))
    ((first lst3) (remove-all (first lst3) lst1))))


(defun list-set-difference (lst1 lst2 lst3)
  (cond
    ((null lst2) (remove-all (first lst3) lst1))
    ((null lst3) (remove-all (first lst2) lst1))
    (t (list-set-difference (remove-all (first lst2) (remove-all (first lst3) lst1)) (rest lst2) (rest lst3)))))


(defun check-list-set-difference (name input1 input2 input3 expected)
  (format t "~:[FAILED~;passed~]... ~a~%" (equal (list-set-difference input1 input2 input3) expected)
	  name))


(defun test-list-set-difference ()
  (format t "test-list-set-difference~%")
  (check-list-set-difference "test2.1" '(1 2 3 4) '(4 5 6) '(2 5 7) '(1 3))
  (check-list-set-difference "test2.2" '(1 3 4 6 8) '(1 4 6) '(2 4 6) '(3 8))
  (check-list-set-difference "test2.3" '(9 3 a 2 g d) '(d 3 1) '(1 4 6) '(9 a 2 g))
  (format t "~%"))


(test-list-set-difference)


