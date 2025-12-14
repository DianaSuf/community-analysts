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
  },
  reducers: {
    openModal( state, action: PayloadAction<{ type: ModalType; }>) {
      state.type = action.payload.type
    },
    closeModal(state) {
      state.type = null
    },
  },
})

export const { getCurrentModal } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions
