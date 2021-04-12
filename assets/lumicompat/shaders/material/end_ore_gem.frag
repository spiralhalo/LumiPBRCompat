#include lumiext:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumiext:shaders/internal/frag.glsl

/******************************************************
  lumicompat:shaders/material/end_ore_gem.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
#if LUMIEXT_MaterialCoverage == LUMIEXT_MaterialCoverage_ApplyAll
#ifdef LUMI_PBRX
  pbr_roughness = 0.7;
  vec3 c = data.spriteColor.rgb;
  if (c.r * c.g < 0.5) {
    pbr_roughness = 0.2;
    pbr_f0 = 0.17;
  }
#endif
#endif

#ifdef LUMI_BUMP
  _applyBump(data);
#endif
}
