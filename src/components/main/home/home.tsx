import { Button } from "@/components/ui/button"
import { H2, P } from "@/components/ui/typography"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { PlusIcon } from "lucide-react"
import styles from "./home.module.scss"

export default function Home() {
  return (
    <>
      <section className={styles.block}>
        <div className={styles.content}>
          <H2>
            Сообщество бизнес-инженеров Урала
          </H2>
          <P>
            Мы — ведущее экспертное сообщество Уральского региона в сфере бизнес-инжиниринга.
            Объединяя глубокую теоретическую базу с проверенной практикой,мы предлагаем решения,
            которые знают и активно используют ключевые компании региона для достижения своих стратегических целей.
          </P>
          <Button>
            Подать заявку на вступление <PlusIcon />
          </Button>
        </div>
        <AspectRatio ratio={543 / 322}>
          <img src="/img/home.jpg" alt="main"></img>
        </AspectRatio>
      </section>
    </>
  )
}
