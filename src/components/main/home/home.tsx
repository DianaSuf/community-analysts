import { Button } from "@/components/ui/button"
import { Item, ItemGroup } from "@/components/ui/item"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { PlusIcon } from "lucide-react"
import styles from "./home.module.scss"

export default function Home() {
  return (
    <>
      <ItemGroup className={styles.section}>
        <Item className={styles.block}>
          <h1>
            Сообщество бизнес-инженеров Урала
          </h1>
          <p className={styles.contentText}>
            Мы — ведущее экспертное сообщество Уральского региона в сфере бизнес-инжиниринга.
            Объединяя глубокую теоретическую базу с проверенной практикой,мы предлагаем решения,
            которые знают и активно используют ключевые компании региона для достижения своих стратегических целей.
          </p>
          <Button className={styles.contentButton}>
            Подать заявку на вступление <PlusIcon />
          </Button>
        </Item>
        <AspectRatio ratio={543 / 322}>
          <img src="/img/home.jpg" alt="main" className={styles.imgHome}></img>
        </AspectRatio>
      </ItemGroup>
    </>
  )
}
