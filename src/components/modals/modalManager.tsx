import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal, getCurrentModal, openModal} from '../../store/slices/modal-slice';
import { ModalType } from '../../const';
import { AuthorizationModal } from './authorization-modal';
import { ApplyModal } from './apply-modal';

export default function ManagerModals() {
  const dispatch = useAppDispatch();
  const currentModal = useAppSelector(getCurrentModal);

  const closeCurrentModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {currentModal === ModalType.Authorization && (
        <AuthorizationModal
          open
          onOpenChange={(open) => !open && closeCurrentModal()}
          onSwitch={() => dispatch(openModal({type: ModalType.Apply}))}
        />
      )}
      {currentModal === ModalType.Apply && (
        <ApplyModal
          open
          onOpenChange={(open) => !open && closeCurrentModal()}
          onSwitch={() => dispatch(openModal({type: ModalType.Authorization}))}
        />
      )}
    </>
  );
};
