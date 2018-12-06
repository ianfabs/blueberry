<template>
  <div>
    <div class="editor-group">
      <nav v-if="menu">
        <template v-for="(option, index) of allMenuOptions">
          <v-btn icon :key="index" @click="option.action" :id="option.name">
            <v-icon>{{ option.icon }}</v-icon>
          </v-btn>
        </template>
        <v-menu offset-y>
            <v-btn slot="activator" color="primary" dark>
              magic
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in magicwords" :key="index" @click="insertMagicWord(item.action)">
                <v-list-tile-title>{{ item.word }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
      </nav>
      <v-divider />
      <div contenteditable="true"
        class="v-editor"
        ref="editor"
        @input="handleContentBinds"
      >
      <MagicMood></MagicMood>
      </div>
    </div>
  </div>
</template>

<script>
import MagicMood from "@/components/Magic/Mood";
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


function exec(){
    let args = arguments;
    return (args)=>{document.execCommand(...arguments);}
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
            return `${charging ? "🔌🔋" : "🔋"} ${level * 100}%`;
          }
        },
        {
          id: 3,
          word: "dice",
          action: async () => {
            function random(){
              return Math.round(Math.random() * 10)
            }
            return `🎲${(random() % 6)+1} 🎲${(random() % 6)+ 1}`;
          }
        },
        {
          id: 4,
          word: "mood",
          action: async () => {
            
            return ``;
          }
        }
      ],
      allMenuOptions: [
        {
          keywords: ["format", "bold"],
          name: "bold",
          icon: "format_bold",
          action: exec("bold", false)
        },
        {
          keywords: ["format", "italic"],
          name: "italic",
          icon: "format_italic",
          action: exec("italic", false)
        },
        {
          keywords: ["format", "underline"],
          name: "underline",
          icon: "format_underline",
          action: exec("underline", false)
        },
        {
          keywords: ["heading"],
          name: "format_h1",
          icon: "format_size",
          action: exec("formatBlock", false, "<h1>")
        },
        {
          keywords: ["alignment", "left"],
          name: "align_left",
          icon: "format_align_left",
          action: exec("justifyLeft", false)
        },
        {
          keywords: ["alignment", "center"],
          name: "align_center",
          icon: "format_align_center",
          action: exec("justifyCenter", false)
        },
        {
          keywords: ["alignment", "right"],
          name: "align_right",
          icon: "format_align_right",
          action: exec("justifyRight", false)
        },
        {
          keywords: ["magic", "words"],
          name: "magic",
          icon: "add",
          /* 
            Noticed a bug here:
            If you change `icon` to add_comment, vuetify renders both add AND add_comment icons
          */
          action: ()=>{}
        }
      ]
    };
  },
  methods: {
    async insertMagicWord(action) {
      let word = `<span class='m-word' contenteditable='false'>${await action()}</span>\n`;
      pasteHtmlAtCaret(word, false);
      var event = new Event("input", {
        bubbles: true,
        cancelable: true
      });

      this.$refs.editor.dispatchEvent(event);
    },
    handleContentBinds(event) {
      this.$emit("input", this.$refs.editor.innerHTML);
    }
  },
  components: {
    MagicMood
  }
};
</script>

<style>
.v-editor {
  border-bottom: 1px solid black;
  padding: 15px 10px;
  min-width: 20vw;
  transition: border-bottom 0.2s;
}
.v-editor:focus {
  border-bottom: 3px solid #5c6bc0;
  outline: none;
}
.m-word{
  border: 3px solid #C5CAE9;
  background-color: bisque;
  border-radius: 5px;
  padding: 0.5vh 0.25vw;
  white-space: nowrap;
}
/* 
https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=7986CB&secondary.color=5C6BC0
 */
</style>
