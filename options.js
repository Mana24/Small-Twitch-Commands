// OPTIONS SHCEMA
// {
//   exemptCommands: [
//          { content: //Name in lower case, id:  UUID }
//      ],
//   smallUsers: [
//          { content: //The DISPLAY Name in lower case, id:  UUID (not related to the twitch ID) }
//      ],
//   initalized: Boolean of wether or not options has been ever used before or not. it will never be false
// }
//
//

function addListItem(content, parent, onRemove) {
	const li = document.createElement("li");
	li.classList.add("list-item");

	const p = document.createElement("p");
	p.classList.add("list-item-content");
	p.innerText = content;

	const button = document.createElement("button");
	button.classList.add("list-item-remove");
	button.innerText = "X"

	button.addEventListener("click", () => {
		onRemove();
		li.remove();
	});

	parent.appendChild(li);
	li.appendChild(p);
	li.appendChild(button);
}

// I don't know how to name this function.
// It removes an item from either exemptCommands or smallUsers
async function removeStorageItem(key, id) {
	const items = await storageGetSingle(key);
	await storageSet({
		[key]: items.filter((item) => item.id != id),
	});
}

// Not sure how to name this either
// It adds an item to either exemptCommands or smallUsers
async function addStorageItem(key, content) {
	const items = await storageGetSingle(key);
	const newItem = {
		content,
		id: self.crypto.randomUUID(),
	}
	items.push(newItem);
	await storageSet({ [key]: items });
	return newItem;
}

async function initalizeList(key, listContainer) {
	const ul = listContainer.querySelector('ul');
	const items = await storageGetSingle(key);

	for (let i = 0; i < items.length; i++) {
		addListItem(items[i].content, ul, () =>
			removeStorageItem(key, items[i].id)
		);
	}
	const itemAddForm = listContainer.querySelector(".list-controls");
	itemAddForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const input = itemAddForm.querySelector('input');
		const inputValue = input.value.trim().toLowerCase();
		if (inputValue) {
			const newItem = await addStorageItem(key, inputValue);
			addListItem(inputValue, ul, () => removeStorageItem(key, newItem.id));
			input.value = ""
		}
	});
}

// Just a concinence function to not repeat myself. nothing much here.
async function initalizeAllLists() {
	initalizeList("exemptCommands", document.getElementById("exemptCommands"));
	initalizeList("smallUsers", document.getElementById("smallUsers"));
}

async function restore(originalOptions) {
	await storageSet(originalOptions);

	// Clear lists
	document.querySelectorAll('.list-container ul li').forEach((item) => item.remove());
	initalizeAllLists();
}

async function asyncMain() {
	let initialOptions = await storageGet(null);
	console.log("options contents", initialOptions);
	if (!initialOptions.exemptCommands) {
		initialOptions = {
			exemptCommands: [],
			smallUsers: [],
		};
		await storageSet(initialOptions);
	}

	initalizeAllLists();

	const debugButton = document.getElementById("debug");
	debugButton?.addEventListener("click", () => storageGet().then(console.log));

	const clearButton = document.getElementById("clear");
	clearButton?.addEventListener("click", storageClear);

	const restoreButton = document.getElementById('restore');
	restoreButton.addEventListener('click', () => restore(initialOptions))
}

asyncMain();
