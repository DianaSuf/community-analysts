import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal, getCurrentModal, getCurrentModalProps } from '../../store/slices/modal-slice';
import { ModalType } from '../../const';
import { AuthorizationModal } from './authorization-modal';
import { ApplyModal } from './apply-modal';
import { ReasonModal } from './reason-modal';

export default function ManagerModals() {
  const dispatch = useAppDispatch();
  const currentModal = useAppSelector(getCurrentModal);
  const modalProps = useAppSelector(getCurrentModalProps);

  const closeCurrentModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {currentModal === ModalType.Authorization && (
        <AuthorizationModal
          open
          onOpenChange={(open) => !open && closeCurrentModal()}
        />
      )}
      {currentModal === ModalType.Apply && (
        <ApplyModal
          open
          onOpenChange={(open) => !open && closeCurrentModal()}
        />
      )}
      {currentModal === ModalType.Reason && (
        <ReasonModal
          open
          onOpenChange={(open) => !open && closeCurrentModal()}
          onSubmit={modalProps?.onSubmit as ((reason: string) => void) | undefined}
        />
      )}
    </>
  );
};
