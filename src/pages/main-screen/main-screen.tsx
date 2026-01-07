import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Item, ItemGroup } from "@/components/ui/item";
import Card from "@/components/card/card";
import { AuthorizationStatus, ModalType } from "@/const";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAuthorizationStatus } from "@/store/slices/user-slice";
import { PlusIcon } from "lucide-react";
import styles from "./main-screen.module.scss"
import { openModal } from "@/store/slices/modal-slice";

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <ItemGroup className={styles.sectionHome}>
        <Item className={styles.block}>
          <h1>
            Сообщество бизнес-инженеров Урала
          </h1>
          <p className={styles.text}>
            Мы — ведущее экспертное сообщество Уральского региона в сфере бизнес-инжиниринга.
            Объединяя глубокую теоретическую базу с проверенной практикой,мы предлагаем решения,
            которые знают и активно используют ключевые компании региона для достижения своих стратегических целей.
          </p>
          {authorizationStatus === AuthorizationStatus.UNKNOWN && (
            <Button className={styles.button} onClick={() => dispatch(openModal({type: ModalType.Apply}))}>
              Подать заявку на вступление <PlusIcon />
            </Button>
          )}
        </Item>
        <AspectRatio ratio={543 / 322}>
          <img src="/img/home.jpg" alt="main" className={styles.image}></img>
        </AspectRatio>
      </ItemGroup>
      <ItemGroup className={styles.sectionMission}>
        <Card borderRadius={2.4} padding="2.5rem 2rem">
          <h3>Видение</h3>
          <p>
            Мы — ведущее экспертное сообщество Уральского региона в сфере бизнес-инжиниринга.
            Объединяя глубокую теоретическую базу с проверенной практикой, мы предлагаем решения,
            которые знают и активно используют ключевые компании региона для достижения своих стратегических целей.
          </p>
        </Card>
        <Card borderRadius={2.4} padding="2.5rem 2rem" className={styles.principlesBlock}>
          <h3>Принципы</h3>
          <ul>
            Наше сообщество основано на принципах открытости, коллегиальности и самоорганизации.
            <li>
              <span>Некоммерческая основа:</span> Мы — профессиональная ассоциация, не оказывающая коммерческих услуг.
            </li>
            <li>
              <span>Равенство прав:</span> Каждый участник обладает равными правами и возможностями влияния на развитие сообщества.
            </li>
            <li>
              <span>Добровольная активность:</span> Инициатива и участие в проектах основываются на личной ответственности и желании каждого члена.
            </li>
            <li>
              <span>Открытый вход:</span> Мы открыты для всех практикующих специалистов и тех, кто проявляет искренний интерес к бизнес-инжинирингу.
            </li>
          </ul>
        </Card>
        <Card borderRadius={2.4} padding="2.5rem 2rem">
          <h3>Миссия</h3>
          <p>
            Мы развиваем бизнес-среду Урала, создавая сообщество лидеров в области бизнес-инжиниринга.
            Наша цель — обеспечивать профессиональный рост наших участников и совместно внедрять эффективные решения,
            которые делают компании региона сильнее.
          </p>
        </Card>
      </ItemGroup>
    </>
  )
}
