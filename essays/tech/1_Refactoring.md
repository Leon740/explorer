# Refactoring

> Improving the codebase without changing behavior for the end user.

## Refactoring is not

- changing existing functionality
- adding new features

## Refactoring

- saves development time  
  (through reuse of functionality)
- simplifies updates and maintenance  
  (updating one shared module instead of five duplicates)
- improves readability and documentation  
  (tests as documentation, code as prose)
- helps other developers work effectively with the codebase

## How to refactor

**Task**  
Add feature **B** while feature **A** already exists.

- refactor feature **A**  
  (each change → run → tests → commit)
- implement feature **B**
- refactor feature **B**

_Large modules can be refactored gradually, in small steps, over time._

## When not to refactor

- entire large modules - instead, create a new module
  implementing only the necessary functionality (**YAGNI**)
- modules that are unrelated to the current task or work area

## Legacy code

There are large codebases with tangled logic and no tests at all.  
In such cases, it’s best to rely on approaches from  
**“Refactoring Legacy Applications”** (or similar guides),
starting with isolating code and introducing tests.
