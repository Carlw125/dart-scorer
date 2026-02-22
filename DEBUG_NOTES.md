#Debug Notes

a running log of bigs, fixes, and lessons learned.

### Template -

### Bug:
### Sympton:
### Cause:
### Fix:
### Lesson:

---

### Bug: Bust condition never true
### Sympton: bust() alert fired but if(bust()) never ran
### Cause: bust() returned undefined instead of true
### Fix: return true from bust()
### Lesson: Functions used in if() must return a boolean (true/false)

---

### Bug: undoLastScore function is adding lastScore and currentScore like strings instead of integers
### Sympton: e.g. 300 += 120 == 300120 instead of 420
### Cause: userInput.value automatically turns an integer into a string
### Fix: added "+" before lastScore to turn it back into integer. The problem never arrised on the minusScore function ass - automatically turns strings into integers so I never realised userInput.value was creating a string in the first place.
### Lesson: taking .value turns integer into string. Use + before the variable to turn back into integer. MAIN LESSON: Number + Number = Number. String + anything = string. Number - number = number. Number - String = number.

---

### Bug: Input field for players names moving out of position when trying to increase font size.
### Sympton: Input field moves too far to the right when increasing font-size.
### Cause:
### Fix:
### Lesson:

---

### Bug: Created checkInvalid function with some() to loop through invalid scores for checkInvalidScore function but it stopped the if statement in the checkInvalid from working.
### Sympton: When function is called, the if was returning false.
### Cause: Didnt return the invalidScores.some((score => userInput.value === score)) so the if condition was getting passed "undefined" everytime which is falsy.
### Fix: added return into checkInvalid function.
### Lesson: Remember to add return in a function where I require a value from it.

---