<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose"
      class="backdrop"
      :class="{ 'full-cover': fullCover, modalOpen: show }"
    ></div>

    <dialog
      open
      v-if="show"
      :class="{ 'full-cover': fullCover, modalOpen: show }"
      :style="{ width: width, height: height }"
    >
      <header class="modal__header">
        <slot name="header">
          <h2 class="modal__title">{{ title }}</h2>
        </slot>
        <span
          v-if="!fixed"
          @click="tryClose"
          role="button"
          class="modal__header--close-icon"
        >
          <i class="fa fa-times"></i>
        </span>
      </header>
      <section class="modal__body" :style="{height: bodyHeight}">
        <slot></slot>
      </section>
      <div v-if="!fixed" class="modal__footer" :class="{'modal__footer--hide': hideFooter}">
        <slot name="actions">
          <button-cta @click="tryClose" label="Close"></button-cta>
        </slot>
      </div>
    </dialog>
  </teleport>
</template>

<script>
import ButtonCta from "../Button/ButtonCta";

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false
    },
    fullCover: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
    },
    bodyHeight: {
      type: String,
    },
    hideFooter: {
      type: Boolean,
      default: false
    }
  },
  components: { ButtonCta },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(218, 227, 230, 0.383); */
  -webkit-backdrop-filter: blur(0.5px);
  backdrop-filter: blur(0.5px);
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: none;
  height: fit-content;
  min-width: 50%;
  /* width: 700px; */
  max-width: 80%;
  z-index: 999;
  border-radius: 7px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #fff;
  transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.modal__header {
  position: relative;
  background-color: #fff;
  color: var(--default);
  width: 100%;
  padding: 1.1rem;
  overflow: hidden;
  border-bottom: 1px solid #f7fafc;
}

.modal__header--close-icon {
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: 1.4rem;
  transform: translateY(-50%);
  display: inline-block;
  color: rgba(0, 0, 0, 0.3);
  transition: all 0.15s ease;
}

.modal__header--close-icon:hover {
  color: rgba(0, 0, 0, 0.5);
}

.modal__header h2 {
  margin: 0;
  color: inherit;
}

.modal__body {
  background-color: #f7fafc;
  min-height: 100px;
  padding: 1rem 1.1rem;
}

.modal__footer {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  border-top: 1px solid #f7fafc;
}

.modal__footer--hide {
  display: none;
}

.backdrop.modalOpen {
  opacity: 1;
}

dialog.modalOpen {
  transform: translate(-50%, -50%);
}
</style>
