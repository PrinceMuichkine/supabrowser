import { ArrowRight, LucideIcon, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/actions/utils"

interface ButtonExpandProps {
    text: string;
    icon?: LucideIcon;
    bgColor?: string;
    textColor?: string;
    hoverBgColor?: string;
    hoverTextColor?: string;
    onClick?: () => void;
    className?: string;
    iconPlacement?: 'left' | 'right';
    type?: 'button' | 'submit' | 'reset';
}

function ButtonExpand({
    text,
    icon: Icon = ArrowRight,
    bgColor = "bg-green-50 dark:bg-green-900/30",
    textColor = "text-green-700 dark:text-green-300",
    hoverBgColor = "hover:bg-green-100 dark:hover:bg-green-900/40",
    hoverTextColor = "hover:text-green-800 dark:hover:text-green-200",
    onClick,
    className,
    iconPlacement = 'right',
    type = 'button'
}: ButtonExpandProps) {
    return (
        <Button
            type={type}
            variant="outline"
            className={cn(
                `text-lg sm:text-base font-medium ${textColor} ${hoverTextColor} ${bgColor} ${hoverBgColor} shadow-shadow transition-all duration-300 h-[52px] sm:h-10 px-[32px] sm:px-4 focus:outline-none focus-visible:outline-none`,
                className
            )}
            onClick={onClick}
        >
            {iconPlacement === 'left' && <Icon className="h-4 w-4 mr-2" />}
            {text}
            {iconPlacement === 'right' && <Icon className="h-4 w-4 ml-2" />}
        </Button>
    )
}

// Pre-configured button for Connect action
function ButtonExpandIconRight() {
    return (
        <ButtonExpand
            text="Connect"
            onClick={() => window.location.href = '/sign-in'}
        />
    )
}

// Pre-configured button for Talk to us action
function ButtonExpandTalkToUs() {
    return (
        <ButtonExpand
            text="Talk to us"
            icon={Phone}
            bgColor="bg-blue-50 dark:bg-blue-900/30"
            textColor="text-blue-700 dark:text-blue-300"
            hoverBgColor="hover:bg-blue-100 dark:hover:bg-blue-900/40"
            hoverTextColor="hover:text-blue-800 dark:hover:text-blue-200"
            onClick={() => window.open('https://cal.com/babacar-diop-umkvq2/30min', '_blank')}
        />
    )
}

// Back button with specific styling
function ButtonExpandBack({ onClick, text }: { onClick?: () => void, text: string }) {
    return (
        <ButtonExpand
            text={text}
            icon={ArrowLeft}
            iconPlacement="left"
            bgColor="bg-zinc-900/90 dark:bg-black/50"
            textColor="text-zinc-100 dark:text-sage-100"
            hoverTextColor="hover:text-white dark:hover:text-sage-200"
            hoverBgColor="hover:bg-zinc-900"
            className="relative z-20 inline-flex items-center transition-colors px-4 py-2 rounded-none border-zinc-800 border w-fit shadow-none backdrop-blur-sm"
            onClick={onClick}
        />
    )
}

export {
    ButtonExpand,
    ButtonExpandIconRight,
    ButtonExpandTalkToUs,
    ButtonExpandBack
} 