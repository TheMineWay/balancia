---
sidebar_position: 3
---

# 🧩 Features architecture

This project uses the _features_ architecture everywhere. This pattern groups code by features, for example: all code related to authentication could be organized inside the "auth" feature. Also, the "auth" feature could be grouped inside the "core" feature, as more core code might be present.

Each feature has its own pattern of folders that define which folders can be present inside the feature. Fo example, a common case is to have the "lib" folder that contains code utilities.

It's important to know that it is OK to use feature specific code in other features. For example, it is OK to use a hook from the "user" feature in another feature. This organization methodology does not restrict the usage of code from "external" features.
You can think of each feature as an individual library. It has it's logic, but you might need to use some of its utilities somewhere else.

## 🧑‍💻 Using the CLI

To keep consistency and avoid mistakes you can use the utilities script to create features in each project. It will ask you some details and create some folders and files.
