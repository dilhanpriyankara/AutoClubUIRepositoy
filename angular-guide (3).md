### App Structure

- #### Folder Structure

  - Follow **folders-by-feature** application structure
  - Follow LIFT
	 - Locate: make something easy to find, keep related together
	 - Identify: make something easy to identify, use proper naming conventions
	 - Flat: minimize levels, make subfolders only when needed
	 - T-DRY: Try to be DRY (don't repeat yourself), but prioritize readability
   - File naming convention  
     `feature-name.type.ext`
	 - member-list.component.ts
	 - member-list.component.html
	 - member.service.ts

```
|-- src 
  |--	app 
      |-- core (essential to run the application; services, guards, models) 
      |   |-- models  
      |   |   > member.model.ts 
      |   |-- services 
      |   |   > feature-1.service.ts 
      |   |   > member.service.ts 
      |   |-- state 
      |   |   > actions.ts 
      |   |   > reducer.ts 
      |   > core.module.ts 
      |    
      |-- shared (stuff used across multiple modules) 
      |   |-- components 
      |   |   > popup.component.ts 
      |   |   > popup.component.html 
      |   |-- services 
      |   |   > popup.service.ts 
      |   > shared.module.ts 
      | 
      |-- member (feature, separate and lazy-loadable if needed, content from features shouldn’t be used in other modules) 
      |   |-- member-list 
      |   |   > member-list.component.ts 
      |   |   > member-list.component.html 
      |   |   > member-list.component.css 
      |   |   > member-detail.component.ts 
      |   |   > member-control.component.ts 
      |   |-- member-add-edit 
      |   |   > member-add-edit.component.ts 
      |   |   > member-add-edit.component.html 
      |   |   > member-add.component.ts          
      |   |   > member-edit.component.ts 
      |   |-- state 
      |   |   > member.actions.ts 
      |   |   > member.reducer.ts 
      |   > member.routing.ts 
      |   > member.module.ts 
      | 
      > app.component.ts 
      > app.component.html 
      > app.routing.ts 
      > app.module.ts 
```


    
- #### File structure
	- use **public-first** member order
	  1. public fields
	  2. private fields
	  3. public methods
	  4. private methods

> [Angular - Coding style guide](https://angular.io/guide/styleguide)



---
### Modules
- Modules can be used to split the application into independent sub parts  
- Good idea is to split modules by routes (allows lazy loading if needed)
	- ex:  
	`/members` -> MemberModule  
	`/admin` -> AdminModule  

>
- NgModule decorator
	- **imports**
	   stuff from other modules to be used in this module
	- **exports**
	   stuff from this module to be used in other modules
	- **declarations**
	   stuff from this module to be used in this module
	- **providers**
	   DI configuration for stuff to be initialized only for this module
	   (ex: services declared here will have a separate instance for this module alone)
	- **bootstrap**
	   components to be loaded on module initiation, instead via templates or routes (dynamically)

- Lazy Loading
     - load components and related stuff only when needed
     - code-splitting is done by web-pack as per the use of `import()` function

following will download the Member module with its declared stuff as a separate js bundle, when app is routed to `/members`.

```typescript
const routes: Routes = [
  {
    path: 'members',
    loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
  }
];
```
> [Angular - Introduction to modules](https://angular.io/guide/architecture-modules)


---
### Components

  - Data Binding
	  - **string interpolation**: `{{ fieldName }}`
	     used to output a string value of a variable or expression
		   - pipes: `{{ fieldName | pipeName:'arg1':'arg2' }}`
			   used to transform display output, ex:  
			   `{{ member.name | titlecase }}`  
			   `{{ today | date:'shortTime' }}`  
	  - **property binding**: `[propertyName]`
	     used to set the the property value
	  - **event binding**: `(event)`
	     used to provide event handlers  
      - **two way binding**: `[(property)]` 
         combines property and event binding to sync a property value between template and the component

  - Directives
	  - **structural** directives: `*ngFor`, `*ngIf`
	     used to add/remove DOM elements
	  - **attribute** directives: `ngClass`,`ngModel`
	     used to modify existing DOM elements

**Note:** 
Components are reused across application and will to be created and destroyed as needed.
- should be lightweight
- should not maintain continuous state inside
- should be view focused and should not house complex logic
- should unsubscribe from all observables on destroy

> [Angular - Introduction to components and templates](https://angular.io/guide/architecture-components)


---
### Services

- Services are reusable features that can be injected to components as needed 
- Angular defines them as a class with a narrow, well-defined purpose
- Angular dependency injection framework is responsible for managing their instances across application

Following will create an **app wide (root)  instance** of the `TestService` that can be injected to components, across modules
```typescript
@Injectable({
  providedIn: 'root',
})
export class TestService {
}
```

In order to create a **module wide instance**, where each providing module will have a separate instance of the service, it needs be registered in the `providers` section of the module
```typescript
@NgModule({
  providers: [
    TestService
  ],
})
export class TestModule {
}
```
> [Angular - Introduction to services and dependency injection](https://angular.io/guide/architecture-services)




---
### Forms

- #### Template Driven
	- form is controlled by the template using 	`ngModel`
	- suitable for simple forms which are less likely to change, ex: search
	- less efficient (two way binding)
	- needs custom validation via directives and events

```typescript
@Component({
  selector: 'app-search',
  template: `
    Search: <input type="text" [(ngModel)]="query">
  `
})
export class SearchComponent {
  query = '';
}
```

- #### Reactive
	- form is controlled by the component using `formControl`
	- suitable for complex and dynamic forms
	- more efficient
	- has inbuilt validation framework

```typescript
@Component({
  selector: 'app-search',
  template: `
	Search: <input type="text" [formControl]="query">
  `
})
export class SearchComponent {
  query = new FormControl('');
}
```
> [Angular - Introduction to forms in Angular](https://angular.io/guide/forms-overview)



---
### NgRx

- NgRx is the angular implementation of the redux pattern
- It provides readymade helpers and typed models for redux components
>
- #### Terms
	- **state**
		- current status of the application   
		   ex:
			-  `sidebarOpen: true / false`
			- `sortMode: 'ASC' / 'DESC'`
			- `page: 1`
			- `items: []`
		- we can keep the state in components or services
		- NgRx is used to mange all the states from one place called `store`
		- `store` is an observable so we can subscribe and listen for changes
	- **actions**
		- actions trigger changes to the state  
		  ex:
		  - `sidebar-switch` action changes the sidebar state
		  - `sort-mode` action changes the sorting mode state
		  - `page-change` action changes the selected page
		  - `data-load` action changes the available items
	    - we can manually change the status on events
	    - NgRx provides `createAction()` helper to create type safe actions
	    - NgRx provides `store.dispatch()` method to trigger action changes
   - **reducer**
	   - simple function to get the next status by passing the action and the current status  
	     ex:
	     - on `sidebar-switch` action, reducer should return the ***new*** state based on current state
	       if current state is`sidebarOpen: true`, reducer will return new state with `sidebarOpen: false`
	    - NgRx provides `createReducer()` helper to create type safe reducers without the boilerplate code

```typescript
export const initialState = {
  sidebarOpen: false,
  sortMode: 'ASC'
};

export const sideBarChange = createAction(
  '[SideBar] Side Bar Change',
  props<{ open: boolean }>()
);

export const appReducer = createReducer(
  initialState,
  on(sideBarChange, (state, { open }) => {
    return { ...state, sidebarOpen:  open }
  }),
  // more action handling reducers
);

// state listening
store.subscribe((state: any) => {
  console.log("Side Bar Changed: open=", state.sidebarOpen);
});

// state dispatching
store.dispatch(sideBarChange({ open:  true }));
```
> [NgRx - Walkthrough](https://ngrx.io/guide/store/walkthrough)  
> [Three Principles | Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles)


---
### RxJS

- just another implementation of observer pattern ([ReactiveX](http://reactivex.io/))
- provides number of functions to create observables
- provides huge set of operators to modify observed items
>
-	**Observable**
	-	provides a *multiple-push* strategy to access data (compared to promises which is *single-push*)
	-	many of the angular modules provide observables to access data and events from various sources
	-	we can create custom observable using `new Observable()` or many utility functions like `of()`, `from()`, `fromEvent()`, `timer()`, etc.
	-	`observable.subscribe()` function is used by subscribers to listen to the changes in the source
	-	`observable.pipe()` allows us to manipulate the data passed from the source to subscriber

- **Observable vs Subject**

Observable | Subject
--------   | -----
They are cold: <br>Code gets executed when they have at least a single observer                     | They are hot: <br>Code gets executed and value gets broadcast even if there is no observer
Creates copy of data: <br>Observable creates copy of data for each observer. If its a HTTP call, it gets called for each observer                                                                            | Shares data: <br>Same data get shared between all observers
Uni-directional: <br>Observer can not assign value to observable(origin/master)                         |  Bi-directional: <br>Observer can assign value to observable(origin/master)
if its a service we want to share among all the components, all new subscribers will get value from scratch                                   |   If are using using subject then you miss all the values that are broadcast before creation of observer. (unless its a Replay Subject)
Unicast <br>means can emit values from the observable not from any other component.                      | multicast, can cast values to multiple subscribers and can act as both subscribers and emitter

> [What is the difference between a Observable and a Subject in rxjs?](https://stackoverflow.com/q/47537934)  

- **Operators**
	- operators are utility functions that can be used in `pipe()` function to manipulate data
	- operators is the reason for RxJS to be so popular and powerful tool for asynchronous operations
	- commonly used operators;
		- `filter()`
		    applies a filter function to each element and ignores what returns false
		- `map()`
		    very similar to js `array.map()`.  applies transformation function which returns the new data element
		- `mergeMap()` / `flatMap()`
		    similar to `map()` but returns a observable which will provide the new data element
		- `reduce()`
		    apply an accumulator function, that will create the next element based on the previous and outputs the last
 
 
> [Operators - Learn RxJS](https://www.learnrxjs.io/learn-rxjs/operators)  
> [RxJS - API List](https://rxjs-dev.firebaseapp.com/api)


> Written with [StackEdit](https://stackedit.io/).
