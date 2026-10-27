::: {align="center"}
`<img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=700&size=30&pause=900&color=22C55E&center=true&vCenter=true&width=800&lines=FoodRescue;Good+Food.+Less+Waste.;Rescue+Food.+Make+an+Impact." alt="FoodRescue animated title" />`{=html}

### ♻️ Canteen Surplus Food Management System

A responsive web project that helps students discover and claim surplus
food available in a college canteen.

```{=html}
<p>
```
`<img src="https://img.shields.io/badge/HTML5-Structure-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>`{=html}
`<img src="https://img.shields.io/badge/CSS3-Responsive_Design-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>`{=html}
`<img src="https://img.shields.io/badge/JavaScript-Vanilla_Frontend-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>`{=html}
`<img src="https://img.shields.io/badge/Storage-localStorage-16A34A?style=for-the-badge&logo=googlechrome&logoColor=white" alt="localStorage"/>`{=html}
```{=html}
</p>
```
**Good food deserves a second chance. 🌱**
:::

------------------------------------------------------------------------

## 🧊 Project Snapshot

```{=html}
<table>
```
```{=html}
<tr>
```
```{=html}
<td width="50%" valign="top">
```
### 🎯 The idea

FoodRescue presents surplus canteen food in one place so students can
check what is available and claim eligible items.

### 💚 The purpose

-   Reduce avoidable food waste
-   Make surplus food easier to discover
-   Demonstrate a simple, interactive web application

```{=html}
</td>
```
```{=html}
<td width="50%" valign="top">
```
### ⚙️ Current build

-   **Frontend:** HTML5, CSS3, Vanilla JavaScript
-   **Browser storage:** `localStorage`
-   **Data source:** Sample food items + items added in the browser
-   **Architecture:** Client-side project; no backend or database yet

### 🧭 Project status

`Academic frontend version`

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
</table>
```
## ✨ Features

  -----------------------------------------------------------------------
  Feature                             What it does
  ----------------------------------- -----------------------------------
  🍱 Food cards                       Displays food name, category,
                                      quantity, pickup location,
                                      availability time, and status

  🔎 Search                           Finds food items by name

  🗂️ Category filter                  Filters the list by food category

  ➕ Add food                         Adds a food item after form
                                      validation

  🙌 Claim food                       Changes an available item's status
                                      to `Claimed`

  💾 Browser persistence              Saves food items and claim statuses
                                      using `localStorage`

  🔄 Refresh recovery                 Restores saved items when the page
                                      is reopened or refreshed

  🧮 Discount demo                    Shows the JavaScript discount
                                      example for different spending
                                      amounts

  📱 Responsive layout                Adapts to mobile, tablet, and
                                      desktop screen sizes

  ⚠️ Loading/error states             Demonstrates asynchronous loading
                                      and error handling
  -----------------------------------------------------------------------

## 🧰 Tech Stack --- The Current Version

::: {align="center"}
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                 Technology                                                                 Role in FoodRescue
  ----------------------------------------------------------------------------------------------------------------------------------------- --------------------------
     `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="34" alt="HTML5"/>`{=html} **HTML5**     Semantic structure and
                                                                                                                                            forms

       `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="34" alt="CSS3"/>`{=html} **CSS3**       Layout, styling, and
                                                                                                                                            responsive design

   `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="34" alt="JavaScript"/>`{=html}  Rendering, validation,
                                                               **JavaScript**                                                               filtering, claiming, and
                                                                                                                                            async behavior

                                                             💾 **localStorage**                                                            Browser-local persistence
                                                                                                                                            across refreshes
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
:::

> **Scope note:** This version does not currently use React, Node.js,
> Express, an API, or a database. Food data is stored locally in the
> browser and is not shared between different users or devices.

## 🔁 How It Works

``` text
        ┌──────────────────────┐
        │   Open FoodRescue     │
        └──────────┬───────────┘
                   ▼
        ┌──────────────────────┐
        │ Load saved food data │
        │ or starter samples   │
        └──────────┬───────────┘
                   ▼
        ┌──────────────────────┐
        │ Search / Filter food │
        └──────────┬───────────┘
                   ▼
        ┌──────────────────────┐
        │ Add food or Claim it │
        └──────────┬───────────┘
                   ▼
        ┌──────────────────────┐
        │ Save updates in      │
        │ browser localStorage │
        └──────────┬───────────┘
                   ▼
        ┌──────────────────────┐
        │ Data restored after  │
        │ page refresh         │
        └──────────────────────┘
```

## 🚀 Run Locally

1.  Clone or download this repository.
2.  Open the project folder in VS Code.
3.  Open `index.html` using **Live Server** or a local browser.
4.  Add a food item, claim an available item, and refresh the page to
    check browser storage persistence.

### 📁 Project Files

``` text
FoodRescue/
├── index.html    # Page structure and forms
├── style.css     # Styling and responsive layout
└── script.js     # Food logic, validation, filters, and localStorage
```

## 🧪 Things to Try

-   Search for a food item by name.
-   Select a category to filter the list.
-   Add a new food item with valid details.
-   Claim an available food item.
-   Refresh the page and check that saved items and statuses remain.
-   Try the discount demo with amounts such as `500`, `501`, `1000`, and
    `1001`.

## 🔐 Data & Limitations

-   `localStorage` is browser-specific and tied to the site's origin.
-   Clearing browser site data can remove saved food items.
-   Data is not synchronized across users or devices.
-   There is no authentication, server-side authorization, or shared
    database in this version.

## 🛣️ Possible Next Steps

The project can later evolve into a full-stack application with a
backend API, a shared database, user roles, authentication, collection
workflow, automated tests, and deployment. These are **future
enhancements**, not features claimed by the current version.

## 🌍 Why FoodRescue?

> **Rescue a meal. Reduce waste. Build a better campus.**

::: {align="center"}
Made with 💚 using HTML, CSS, and JavaScript

**FoodRescue --- Good food. Less waste.**
:::
