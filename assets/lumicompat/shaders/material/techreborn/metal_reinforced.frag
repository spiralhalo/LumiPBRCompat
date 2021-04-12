#include lumiext:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumiext:shaders/internal/frag.glsl

/**************************************************************
  lumicompat:shaders/material/techreborn/metal_reinforced.frag
***************************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
#ifdef LUMI_PBRX
  pbr_metallic = 1.0;
  pbr_roughness = 0.5;
#endif

#ifdef LUMI_BUMP
#ifdef LUMIEXT_ApplyBumpMinerals
  vec2 spriteUV = frx_var1.zw;
  vec2 e1 = 1.0-step(0.25, spriteUV);
  vec2 e2 = step(1.0-0.25, spriteUV);
  vec2 e = max(e1, e2);
  float frameness = max(e.x, e.y);
  if (frameness > 0) {
    _applyBump(data);
  }
#endif
#endif
}
