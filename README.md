# franklin-frontend-task

Technical frontend assessment for franklin.ai

This is a technical assessment task for Frontend Software Engineering roles at [franklin.ai](https://franklin.ai/).

Your task is to develop a web application based on a [Figma prototype](https://www.figma.com/proto/krV1Uw4Dh84NUzIJg0pDUH/Coding-Test---Draggable-Component?node-id=1%3A5&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A94). The app must pull some data from the json file in the repository and render it according to the prototype. You will also need to ensure the functionality is as specified in the prototype. You may implement the app in any framework of your choosing (React, Angular, Vue, Svelte, Solid, etc.). A Typescript implementation would be preferable.

The only mandatory detail is that the package.json file must include a script to run the app on a local dev server so that the implementation can be tested.

## Task Expectations

You should take a copy of this repo, implement the requirements described in the prototype, and push them to GitHub for discussion in the scheduled technical interview. You're welcome to use a private repository, as long as it is visible to @doc-E-brown, @rickfoxcroft, @jayvdb, @ray-kw, @boods & @ronaldcurtis.

You will be given the email address of a member of the team, and should email this person with a link to your solution at least 24 hours before the scheduled technical interview. You're also encouraged to email them with questions at any time while working on this task.

**Please don't spend more than a few hours on this task.**

It's not a trick question and we're not expecting anything too elaborate. It's a small self-contained exercise to help us get to know you through your code - how you break down a problem, how you structure your code, you're approach to styling and solving design problems, and how you navigate problem solving with your potential future team-mates.

We'll be looking for well-structured, clear, maintainable code with reasonable performance characteristics. We would also like to see a responsive, extensible and accessible style implementation. We will not be looking for micro-optimisations or for every single detail to be carefully polished.

## Task Requirements

All of the assets and style details required should be available in the [Figma prototype inspection](https://www.figma.com/file/krV1Uw4Dh84NUzIJg0pDUH/Coding-Test---Draggable-Component?node-id=0%3A1).

Use the `books.json` file located in the project root directory to fetch data required for the app. You will have to export the images for each book from the Figma prototype inspection and host them alongside your solution. Add the image location to the json file and refer to the images accordingly in your code.

# Documentation

## Requirements

- [x] Display the title and a “books” tag in the window.
- [x] Display a list of items including a “hidden list” below the “hidden list” separator
- [x] Drag an item (DRAG THIS-Radical Remission) in and out of the hidden list by dragging it on top or below the “Hidden list’ separate
- [x] Update state of the item when dragged
- [x] Click on “Reset” revert back to original order
- [x] Hover on an item and see a window display the item details.

## Running the project

### Start in development

You can run the project in development mode on your local; this saves the need to build and run the project and will start the project irregardless of any type issues that could possibly prevent compilation.

```
npm run dev
```

### Run tests

```
npm run test
```

## Implementation

### Project Bootstrap

The project has been started using the `Next.JS` starter kit triggered by the command bellow. It does have some additional packages that have been added such as tailwind and some additional tsconfig. Tailwind isn't used as part of this project but I do appreciate that it's done some CSS resets that makes the site a bit more predictable.

```
npx create-next-app@latest
```

### Project Structure

I've based this project off the `pages` version of `Next.JS` instead of `app router` as I feel the `pages`` is more stable and I didn't want to deal with any of the side effects of server side rendering/actions.

In my approach I've decided to build all my components as atoms; with each atom having stored relative the styles and tests. This is probably less intuitive for such a small project but I think it makes it easier working with larger code bases.

An example:

```
src
  components
    section-title
      section-title.tsx
      section-title.module.css
      section-title.test.tsx
```

### Drag-and-drop

For the Drag and Drop behaviour I have decided to go with the library called `@dnd-kit/core` as it's a more modern library (supports React hooks) and additionally is well maintained.

I've gone with the sortable implementation of the drag-and-drop behaviour using `@dnd-kit/sortable`; I did spend a while trying to understand and make work the multiple container elements (e.g. for the hidden and visible). I came across two specific problems:

1. I needed to use a react portal to ensure that the drop wasn't canceled when dragging over another drag container
2. I then needed to detect a collision with another element; then update the active elements container to match the element you are over
3. (bonus) I did have to create a placeholder element in an empty container so that you could still drag elements into an empty container.

### State

I've decided to use vanilla React to manage the state (without libraries like Redux, Mobx, Jotai, etc) just to keep things simple. I've also wrapped the state with a Context element to avoid prop drilling where possible.

In terms of displaying the "Reset" button when the state is dirty I have gone with a cheeky approach to `JSON.stringify` the lhs (user state) and rhs (source) values. I did have some alternate considerations:

- Using a flag to track any change, however if you moved an element back into it's origional position then technically the state should be clean and I had no way to know this.
- Keeping track of any modifications made; e.g. movements or deletions but this was more complicated than I felt was needed

## Testing

### Browsers

I developed this implementation using Firefox but have verified that it works in Google Chrome and Safari.

I've not done any testing with mobile browsers or touch input (the mileage of the DnD may vary on mobile browsers with touch input).

### Unit Tests

I've started implementing some unit tests to assert behaviour in particular of shared components. I've not finished adding coverage but I feel there should be sufficient to demonstrate my experience.

I've not done any testing of the DnD related components as I've not had the time and would need to do some investigation on how best to do this as I don't want to mock out all the drag and drop elements.

The files that have tests are as follows:

- src/components/reset-button/reset-button.test.tsx
- src/components/section-title/section-title.test.tsx
- src/components/typography/typography.test.tsx
