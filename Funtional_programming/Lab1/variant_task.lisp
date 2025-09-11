(defun variant-task ()
      (let* ((list-a (list 'a))
            (list-1 (list 1 list-a))
            (list-2 (list 2 list-a))
            (list-3 (list 3 list-a)))
      (print (list list-1 list-2 list-3 'c))))

(variant-task)
