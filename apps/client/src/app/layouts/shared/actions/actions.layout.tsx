import type { WithChildren } from "@common/extended-ui/general/types/component.types"

/**
 * Represents a single actions row.
 */
const Row: FC<WithChildren> = ({ children }) => {
    return <div className="flex gap-2">{children}</div>
}

/**
 * Used as an action rows container.
 */
const Container: FC<WithChildren> = ({ children }) => {
    return <div className="flex flex-wrap gap-4 justify-between">{children}</div>
}

export const ActionsLayout = {
    Row,
    Container
}
