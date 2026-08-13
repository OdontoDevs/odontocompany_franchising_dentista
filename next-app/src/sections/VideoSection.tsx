"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { videoItems, youtubeThumb, VideoKey, youtubeId } from "@/data/videos";
import { Button } from "@/components/ui/button";
import { trackVideoPlay } from "@/lib/tracking";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function VideoSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingKey, setPlayingKey] = useState<VideoKey | null>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
      setPlayingKey(null); // trocar de slide para o vídeo
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="video-section" id="video">
      <div className="container">
        <div className="section-kicker section-kicker--dark video-section-kicker">
          Para você, dentista
        </div>

        {/* Título + subtítulo centralizados no topo */}
        <div
          className="max-w-3xl text-center"
          style={{ marginInline: "auto", marginBottom: "72px" }}
        >
          <h2 className="video-headline">
            Conheça por dentro <em>a OdontoCompany</em>
          </h2>
          <p
            className="video-sub max-w-2xl"
            style={{ marginInline: "auto", marginBottom: 0 }}
          >
            O fundador Dr. Paulo Zahr preparou um recado exclusivo para você. Em
            poucos minutos você entende o modelo, o suporte e o que esperar do
            processo.
          </p>
        </div>
      </div>

      {/* Carrossel de vídeos: 1 grande + peek */}
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true,
            breakpoints: {
              "(max-width: 768px)": { dragFree: false },
            },
          }}
        >
          <CarouselContent className="ml-0 px-[max(1.25rem,calc(50vw-560px))]">
            {videoItems.map((item) => (
              <CarouselItem
                key={item.key}
                className="basis-[88%] md:basis-[72%] lg:basis-[60%]"
                style={{ paddingLeft: "28px" }}
              >
                <div className="group relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-black shadow-[0_28px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] hover:ring-[var(--lime)]/30">
                  {playingKey === item.key ? (
                    <iframe
                      src={item.embed}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`Vídeo ${item.tabLabel}`}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        trackVideoPlay(
                          item.cardSubtitle,
                          `https://www.youtube.com/watch?v=${youtubeId(item.embed)}`
                        );
                        setPlayingKey(item.key);
                      }}
                      aria-label={`Reproduzir: ${item.cardSubtitle}`}
                      className="absolute inset-0 block cursor-pointer text-left"
                    >
                      {/* imagem com zoom no hover */}
                      <span
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        style={{ backgroundImage: `url(${youtubeThumb(item.embed)})` }}
                      />
                      {/* gradiente */}
                      <span className="absolute inset-0 bg-gradient-to-t from-[#0c2422]/90 via-[#0c2422]/35 to-transparent transition-colors duration-300 group-hover:from-[#0c2422]/95" />

                      {/* duração */}
                      {item.duration ? (
                        <span
                          className="absolute z-10 rounded-full border border-white/15 bg-black/35 text-[13px] font-semibold text-white backdrop-blur-md"
                          style={{ top: 16, right: 16, padding: "6px 13px", lineHeight: 1 }}
                        >
                          {item.duration}
                        </span>
                      ) : null}

                      {/* botão play central (glass + pulse) */}
                      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                        <span className="absolute inset-0 rounded-full bg-[var(--lime)]/30 animate-ping" />
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-[1.5px] border-[var(--lime)]/70 bg-[var(--lime)]/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--lime)] group-hover:bg-[var(--lime)] group-hover:shadow-[0_0_0_10px_rgba(168,209,86,0.15),0_12px_40px_rgba(168,209,86,0.4)]">
                          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white transition-colors duration-300 group-hover:fill-[var(--green-900)]">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </span>
                      </span>

                      {/* título inferior */}
                      <span
                        className="absolute z-10 block text-white"
                        style={{ left: 0, right: 0, bottom: 0, padding: "26px 30px 30px 30px" }}
                      >
                        <strong className="block font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
                          {item.cardTitle}
                        </strong>
                        <span
                          className="block text-sm text-white/80"
                          style={{ marginTop: 4 }}
                        >
                          {item.cardSubtitle}
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Setas + dots */}
        <div className="flex items-center justify-center gap-5" style={{ marginTop: "56px" }}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="rounded-full border border-[var(--lime)]/30 text-[var(--lime)] hover:bg-[var(--lime)]/10 hover:text-[var(--lime)] disabled:pointer-events-auto disabled:opacity-30"
            aria-label="Vídeo anterior"
          >
            <ArrowLeft className="size-5" />
          </Button>

          <div className="flex items-center gap-2">
            {videoItems.map((item, index) => (
              <button
                key={item.key}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === index
                    ? "w-7 bg-[var(--lime)]"
                    : "w-2.5 bg-[var(--lime)]/25 hover:bg-[var(--lime)]/50"
                }`}
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Ir para ${item.tabLabel}`}
              />
            ))}
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="rounded-full border border-[var(--lime)]/30 text-[var(--lime)] hover:bg-[var(--lime)]/10 hover:text-[var(--lime)] disabled:pointer-events-auto disabled:opacity-30"
            aria-label="Próximo vídeo"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
