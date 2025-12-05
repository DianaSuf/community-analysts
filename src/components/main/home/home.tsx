import { Button } from "@/components/ui/button"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { PlusIcon } from "lucide-react"
import styles from "./home.module.scss"

export default function Home() {
  return (
    <>
      <section className={styles.block}>
        <div className={styles.content}>
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
        </div>
        <div className={styles.containerImg}>
          <AspectRatio ratio={543 / 322}>
            <img src="/img/home.jpg" alt="main" className={styles.imgHome}></img>
          </AspectRatio>
        </div>
      </section>
    </>
  )
}
