import type { ModalType } from "@/types/modal-data"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IModalState {
  type: ModalType
  props?: Record<string, unknown>
}

const initialState: IModalState = {
  type: null,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  selectors: {
    getCurrentModal: (store) => store.type,
    getCurrentModalProps: (store) => store.props,
  },
  reducers: {
    openModal( state, action: PayloadAction<{ type: ModalType; props?: Record<string, unknown> }>) {
      state.type = action.payload.type
      state.props = action.payload.props
    },
    closeModal(state) {
      state.type = null
      state.props = undefined
    },
  },
})

export const { getCurrentModal, getCurrentModalProps } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions
