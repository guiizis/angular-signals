# What are signals in Angular?

![image](https://github.com/user-attachments/assets/e25ef7e6-fb2a-4594-95fc-44ff21cdb17e)

**Signals** are a new feature introduced in Angular 16, designed to simplify how we handle state in components. Instead of relying on complex mechanisms like observables or heavy state managers, signals offer a more direct and efficient way to track changes and update the user interface.

A signal is essentially a "value holder," meaning it stores a piece of data and automatically notifies Angular when that data changes. This means that whenever the value of a signal is updated, the interface will reactively update, without needing any special handling on your part.

## Practical Example: Creating and Updating a Signal

Let's create a signal called elementoSelecionado, which will store the selected chemical element by the user. Initially, it will be null since no element is selected. Later, when the user clicks on an item from the list, we update this signal.

```tsx
elementoSelecionado = signal<Elemento | null>(null);
```

Whenever the user selects an element, the .set() method is called, updating the state of elementoSelecionado. Here's how simple that is:

```tsx

selecionarElemento(elemento: Elemento) {
  this.elementoSelecionado.set(elemento);
}
```

Now, the magic happens: every time the state of elementoSelecionado changes, the interface that depends on that value will automatically update!

https://github.com/user-attachments/assets/101f1546-3f9c-4d4b-9b94-3f9d4ec3a259

### Why Are Signals Awesome?

Signals make life much simpler for Angular developers. If you're working on something where the state changes locally (e.g., selecting an item in a list, toggling a setting), signals are perfect. They are easy to create, update, and Angular does the heavy lifting of re-rendering everything for you. Plus, for those who have felt lost in the world of observables, signals provide a lighter, less complex alternative for handling state and reactivity.
