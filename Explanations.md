# Exercise 1: Sorting

### Sorting 11 smalls numbers

For this function I ended up using the sorting array method provided by Javascript since it's optimised for performance. I've tried different algorithms and .sort was a clear winner.

### Sorting pow()

In this sorting algorithm I've basically passed the pow element as an array and used the value to sort them with the .sort method.

### Performance Estimation

For the performance estimation, I have used process.hrtime in order to get precision level numbers. I've run the function to be tested with a small sample. I used the time that it took from a small sample subtracted with the targeted number of operations and multiply it by the time it took.

# Exercise 2: Advance/Practical

Technologies used:

- React/Next JS
- Typescript
- React Hooks
- React-storage-hooks (Persistence)

I have ended up building an application with a simple search function as a term for recipes and an autocomplete multiple select options for the ingredients.

### Next.js

The reasoning behind the using Next.js would be in favor of SSR rendering in case we need to index/share recipes for other platforms. The recipes API provided did not support CORS which in the end with Next.js I was able to simply create a proxy for this exercise.

### Typescript

Typescript is my go to when it comes to type safety. Adding proper types really helps in avoiding falling into typical pitfalls encountered in vanilla Javascript.

### React Hooks

Using hooks allows to create context throughout the application and avoids dealing with complicated life cycles.

### React-storage-hooks (Persistence)

This one made me question if Redux Hooks would have been a better option. Although creating persistence is easier to do with react hooks, it could still get a little messy when writing your own persistence logic. In a real world scenario, persistence requirements will help define what technology could be used here.

Note: There's a bug I couldn’t fully troubleshoot that will weirdly render the autocomplete if it comes from a persistent state on first load.
