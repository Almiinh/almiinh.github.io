<script>
    let variables = $state("sdg/FP_CPI_TOTL_ZG");
    let place = $state("country/FRA");
    let header = $state("Annual Inflation, Consumer Prices");
</script>

<form>
    <div class="form-group">
        <label for="dc-header">Header</label>
        <input name="dc-header" bind:value={header} placeholder="Header" />
    </div>
    <div class="form-group">
        <label for="dc-place">Place</label>
        <input name="dc-place" bind:value={place} placeholder="Place" />
    </div>
    <div class="form-group">
        <label for="dc-variables">Variables (Comma-separated) </label>
        <input name="dc-variables" bind:value={variables} placeholder="Variables" />
    </div>
</form>
<datacommons-line {header} {place} variables={variables.split(",").map((v) => v.trim())}></datacommons-line>

<style>
    form {
        display: flex;

        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .form-group {
        display: flex;
        flex-direction: column;
    }

    datacommons-line {
        margin-top: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        height: 400px;
    }
    datacommons-line::part(header),
    datacommons-line::part(y-axis-text),
    datacommons-line::part(y-axis-label),
    datacommons-line::part(y-axis-text),
    datacommons-line::part(x-axis-label),
    datacommons-line::part(x-axis-text) {
        fill: var(--color-text);
        color: var(--color-text);
    }
</style>
