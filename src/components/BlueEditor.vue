<template>
  <div>
    <div class="editor-group">
      <nav v-if="menu">
        <template v-for="(option, index) of allMenuOptions">
          <v-btn icon :key="index" @click="option.action" :id="option.name">
            <v-icon>{{ option.icon }}</v-icon>
          </v-btn>
        </template>
      </nav>
      <v-divider />
      <div
        contenteditable="true"
        class="v-editor"
        ref="editor"
        @input="handleContentBinds"
      ></div>
    </div>
  </div>
</template>

<script>
function pasteHtmlAtCaret(html, selectPastedContent) {
  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      var firstNode = frag.firstChild;
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        if (selectPastedContent) {
          range.setStartBefore(firstNode);
        } else {
          range.collapse(true);
        }
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if ((sel = document.selection) && sel.type != "Control") {
    // IE < 9
    var originalRange = sel.createRange();
    originalRange.collapse(true);
    sel.createRange().pasteHTML(html);
    if (selectPastedContent) {
      range = sel.createRange();
      range.setEndPoint("StartToStart", originalRange);
      range.select();
    }
  }
}

class Editor {
  static exec() {
    document.execCommand(...arguments);
    console.log(...arguments);
  }
  static bold() {
    Editor.exec("bold", false);
  }
  static italic() {
    Editor.exec("italic", false);
  }
  static underline() {
    Editor.exec("underline", false);
  }
  static heading() {
    Editor.exec("heading", false, "h1");
  }
  static alignLeft() {
    Editor.exec("justifyLeft", false);
  }
  static alignCenter() {
    Editor.exec("justifyCenter", false);
  }
  static alignRight() {
    Editor.exec("justifyRight", false);
  }
  static fontSize() {
    Editor.fontSizeCalls =
      Editor.fontSizeCalls || Editor.fontSizeCalls === 1
        ? (Editor.fontSizeCalls + 1) % 8
        : 1;
    Editor.exec("fontSize", false, Editor.fontSizeCalls);
  }
}

export default {
  name: "BlueEditor",
  props: {
    value: String,
    menu: Boolean
  },
  data() {
    return {
      content: this.value,
      showMenu: false,
      magicwords: [
        {
          id: 0,
          word: "time",
          action: () =>
            `⌚ ${new Date().getHours() % 12}:${String(
              new Date().getMinutes()
            ).padStart(2, "0")} ${new Date().getHours() >= 12 ? "PM" : "AM"}`
        },
        {
          id: 1,
          word: "date",
          action: () =>
            `📅 ${new Date().getMonth() +
              1}/${new Date().getDate()}/${new Date().getFullYear()}`
        },
        {
          id: 2,
          word: "battery",
          action: async () => {
            const battery = await navigator.getBattery();
            const level = await battery.level;
            const charging = await battery.charging;
            return `${charging ? "🔌🔋" : "🔋⚡"} ${level * 100}%`;
          }
        }
      ],
      allMenuOptions: [
        {
          keywords: ["format", "bold"],
          name: "bold",
          icon: "format_bold",
          action: Editor.bold
        },
        {
          keywords: ["format", "italic"],
          name: "italic",
          icon: "format_italic",
          action: Editor.italic
        },
        {
          keywords: ["format", "underline"],
          name: "underline",
          icon: "format_underline",
          action: Editor.underline
        },
        {
          keywords: ["font-size"],
          name: "change_fontSize",
          icon: "format_size",
          action: Editor.fontSize
        },
        {
          keywords: ["alignment", "left"],
          name: "align_left",
          icon: "format_align_left",
          action: Editor.alignLeft
        },
        {
          keywords: ["alignment", "center"],
          name: "align_center",
          icon: "format_align_center",
          action: Editor.alignCenter
        },
        {
          keywords: ["alignment", "right"],
          name: "align_right",
          icon: "format_align_right",
          action: Editor.alignRight
        },
        {
          keywords: ["magic", "words"],
          name: "magic_words",
          icon: "add_comment",
          action: this.show
        }
      ]
    };
  },
  methods: {
    async insertMagicWord(action) {
      let word = `<span class='m-word' contenteditable='false'>${await action()}</span>`;
      pasteHtmlAtCaret(word, false);
      var event = new Event("input", {
        bubbles: true,
        cancelable: true
      });

      this.$refs.editor.dispatchEvent(event);
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    handleContentBinds(event) {
      this.$emit("input", this.$refs.editor.innerHTML);
    }
  }
};
</script>

<style scoped>
.v-editor {
  border-bottom: 1px solid black;
  padding: 1vh 2vw;
  min-width: 20vw;
  transition: border-bottom 0.2s;
  line-height: 5vh;
}
.v-editor:focus {
  border-bottom: 3px solid blue;
  outline: none;
}
</style>
